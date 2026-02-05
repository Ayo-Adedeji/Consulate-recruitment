// Cloud database configuration for Supabase
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface CloudConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  enableRealtime: boolean;
  retryAttempts: number;
  retryDelay: number;
  offlineMode: boolean;
}

export interface CloudConnectionStatus {
  isConnected: boolean;
  isOnline: boolean;
  lastSync: Date | null;
  error: string | null;
}

/**
 * Cloud configuration service for managing Supabase connection
 */
export class CloudConfigService {
  private static instance: CloudConfigService;
  private config: CloudConfig;
  private supabaseClient: SupabaseClient | null = null;
  private connectionStatus: CloudConnectionStatus = {
    isConnected: false,
    isOnline: false,
    lastSync: null,
    error: null
  };

  private constructor() {
    this.config = this.loadConfig();
  }

  public static getInstance(): CloudConfigService {
    if (!CloudConfigService.instance) {
      CloudConfigService.instance = new CloudConfigService();
    }
    return CloudConfigService.instance;
  }

  /**
   * Load configuration from environment variables
   */
  private loadConfig(): CloudConfig {
    return {
      supabaseUrl: (import.meta as any).env?.VITE_SUPABASE_URL || '',
      supabaseAnonKey: (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '',
      enableRealtime: (import.meta as any).env?.VITE_ENABLE_REALTIME !== 'false',
      retryAttempts: parseInt((import.meta as any).env?.VITE_RETRY_ATTEMPTS || '3'),
      retryDelay: parseInt((import.meta as any).env?.VITE_RETRY_DELAY || '1000'),
      offlineMode: (import.meta as any).env?.VITE_OFFLINE_MODE === 'true'
    };
  }

  /**
   * Initialize Supabase client and validate connection
   */
  public async initialize(): Promise<void> {
    try {
      // Validate configuration
      this.validateConfig();

      // Create Supabase client
      this.supabaseClient = createClient(
        this.config.supabaseUrl,
        this.config.supabaseAnonKey,
        {
          realtime: {
            params: {
              eventsPerSecond: 10
            }
          }
        }
      );

      // Test connection
      await this.testConnection();

      this.connectionStatus = {
        isConnected: true,
        isOnline: true,
        lastSync: new Date(),
        error: null
      };

      console.log('✅ Cloud database initialized successfully');
    } catch (error) {
      this.connectionStatus = {
        isConnected: false,
        isOnline: false,
        lastSync: null,
        error: error instanceof Error ? error.message : 'Unknown error'
      };

      console.error('❌ Failed to initialize cloud database:', error);
      throw new Error(`Cloud database initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Validate configuration values
   */
  private validateConfig(): void {
    if (!this.config.supabaseUrl) {
      throw new Error('VITE_SUPABASE_URL environment variable is required');
    }

    if (!this.config.supabaseAnonKey) {
      throw new Error('VITE_SUPABASE_ANON_KEY environment variable is required');
    }

    // Validate URL format
    try {
      new URL(this.config.supabaseUrl);
    } catch {
      throw new Error('VITE_SUPABASE_URL must be a valid URL');
    }

    console.log('✅ Cloud configuration validated');
  }

  /**
   * Test database connection
   */
  private async testConnection(): Promise<void> {
    if (!this.supabaseClient) {
      throw new Error('Supabase client not initialized');
    }

    try {
      // Test connection with a simple query
      const { error } = await this.supabaseClient
        .from('cms_collections')
        .select('count', { count: 'exact', head: true });

      if (error && error.code !== 'PGRST116') { // PGRST116 = table doesn't exist (acceptable for first run)
        throw error;
      }

      console.log('✅ Database connection test successful');
    } catch (error) {
      console.error('❌ Database connection test failed:', error);
      throw error;
    }
  }

  /**
   * Get Supabase client instance
   */
  public getClient(): SupabaseClient {
    if (!this.supabaseClient) {
      throw new Error('Supabase client not initialized. Call initialize() first.');
    }
    return this.supabaseClient;
  }

  /**
   * Get current configuration
   */
  public getConfig(): CloudConfig {
    return { ...this.config };
  }

  /**
   * Get connection status
   */
  public getConnectionStatus(): CloudConnectionStatus {
    return { ...this.connectionStatus };
  }

  /**
   * Check if cloud mode is enabled
   */
  public isCloudEnabled(): boolean {
    return !this.config.offlineMode && !!this.config.supabaseUrl && !!this.config.supabaseAnonKey;
  }

  /**
   * Check if system is online and connected
   */
  public isOnline(): boolean {
    return this.connectionStatus.isConnected && this.connectionStatus.isOnline;
  }

  /**
   * Update connection status
   */
  public updateConnectionStatus(status: Partial<CloudConnectionStatus>): void {
    this.connectionStatus = {
      ...this.connectionStatus,
      ...status
    };
  }

  /**
   * Retry connection with exponential backoff
   */
  public async retryConnection(): Promise<void> {
    for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {
      try {
        await this.initialize();
        return;
      } catch (error) {
        if (attempt === this.config.retryAttempts) {
          throw error;
        }
        
        const delay = this.config.retryDelay * Math.pow(2, attempt - 1);
        console.log(`⏳ Retry attempt ${attempt}/${this.config.retryAttempts} in ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
}

// Export singleton instance
export const cloudConfig = CloudConfigService.getInstance();
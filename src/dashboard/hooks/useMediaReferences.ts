import { useState, useCallback } from 'react';
import { storageManager } from '../utils/storage';
import { MediaAsset } from '../types/content';
import { useToast } from '../components/ui/Toast';

interface MediaReference {
  collection: string;
  itemId: string;
  field: string;
}

interface MediaMetadata {
  asset: MediaAsset | null;
  references: MediaReference[];
  usageCount: number;
}

export const useMediaReferences = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  /**
   * Find all references to a media asset
   */
  const findReferences = useCallback(async (mediaId: string): Promise<MediaReference[]> => {
    try {
      setLoading(true);
      return await storageManager.findMediaReferences(mediaId);
    } catch (error) {
      console.error('Failed to find media references:', error);
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to find media references',
      });
      return [];
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  /**
   * Get complete metadata for a media asset
   */
  const getMetadata = useCallback(async (mediaId: string): Promise<MediaMetadata | null> => {
    try {
      setLoading(true);
      return await storageManager.getMediaMetadata(mediaId);
    } catch (error) {
      console.error('Failed to get media metadata:', error);
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to get media metadata',
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  /**
   * Replace a media asset and update all references
   */
  const replaceMedia = useCallback(async (oldMediaId: string, newFile: File): Promise<MediaAsset | null> => {
    try {
      setLoading(true);
      const newMedia = await storageManager.replaceMedia(oldMediaId, newFile);
      
      showToast({
        type: 'success',
        title: 'Success',
        message: 'Media replaced and all references updated successfully',
      });
      
      return newMedia;
    } catch (error) {
      console.error('Failed to replace media:', error);
      showToast({
        type: 'error',
        title: 'Error',
        message: error instanceof Error ? error.message : 'Failed to replace media',
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  /**
   * Delete media with reference checking
   */
  const deleteWithReferenceCheck = useCallback(async (mediaId: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // First check for references
      const references = await storageManager.findMediaReferences(mediaId);
      
      if (references.length > 0) {
        showToast({
          type: 'warning',
          title: 'Cannot Delete',
          message: `This media is used in ${references.length} content item(s). Remove references first.`,
        });
        return false;
      }
      
      // Safe to delete
      const success = await storageManager.deleteMedia(mediaId);
      
      if (success) {
        showToast({
          type: 'success',
          title: 'Success',
          message: 'Media deleted successfully',
        });
      }
      
      return success;
    } catch (error) {
      console.error('Failed to delete media:', error);
      showToast({
        type: 'error',
        title: 'Error',
        message: error instanceof Error ? error.message : 'Failed to delete media',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  /**
   * Update references when media is replaced
   */
  const updateReferences = useCallback(async (oldMediaId: string, newMediaId: string): Promise<boolean> => {
    try {
      setLoading(true);
      await storageManager.updateMediaReferences(oldMediaId, newMediaId);
      
      showToast({
        type: 'success',
        title: 'Success',
        message: 'Media references updated successfully',
      });
      
      return true;
    } catch (error) {
      console.error('Failed to update media references:', error);
      showToast({
        type: 'error',
        title: 'Error',
        message: 'Failed to update media references',
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  /**
   * Check if media can be safely deleted
   */
  const canDelete = useCallback(async (mediaId: string): Promise<{ canDelete: boolean; referenceCount: number }> => {
    try {
      const references = await storageManager.findMediaReferences(mediaId);
      return {
        canDelete: references.length === 0,
        referenceCount: references.length
      };
    } catch (error) {
      console.error('Failed to check media deletion safety:', error);
      return { canDelete: false, referenceCount: -1 };
    }
  }, []);

  return {
    loading,
    findReferences,
    getMetadata,
    replaceMedia,
    deleteWithReferenceCheck,
    updateReferences,
    canDelete,
  };
};
import React from 'react';
import Breadcrumbs from '../layout/Breadcrumbs';

const TeamManager: React.FC = () => {
  return (
    <div className="p-6">
      <Breadcrumbs />
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Team Management</h1>
        <p className="text-gray-600 mb-4">Manage team member profiles and contact information.</p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">🚧 This component will be implemented in Task 10.</p>
        </div>
      </div>
    </div>
  );
};

export default TeamManager;
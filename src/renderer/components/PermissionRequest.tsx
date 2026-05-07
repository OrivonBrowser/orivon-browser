import React from 'react';
import { useUi } from '@/renderer/context/UiContext';
import { usePermissionsStore } from '@/renderer/store/permissionsStore';
import { PermissionRisk } from '@/lib/contracts/types';
import TrustBadge from './TrustBadge';
import './PermissionRequest.css';

export const PermissionRequest: React.FC = () => {
  const { isPermissionModalOpen, closePermissionModal } = useUi();
  const { activeRequests, grantPermission, removePermissionRequest } = usePermissionsStore(
    (state) => ({
      activeRequests: state.activeRequests,
      grantPermission: state.grantPermission,
      removePermissionRequest: state.removePermissionRequest,
    })
  );

  const currentRequest = activeRequests[0];

  if (!isPermissionModalOpen || !currentRequest) return null;

  const handleGrant = async () => {
    for (const perm of currentRequest.permissions) {
      await grantPermission(currentRequest.appId, perm.id);
    }
    removePermissionRequest(currentRequest.id);
    closePermissionModal();
  };

  const handleDeny = () => {
    removePermissionRequest(currentRequest.id);
    closePermissionModal();
  };

  return (
    <div className="modal-overlay" onClick={handleDeny}>
      <div className="modal-content permission-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Permission Request</h2>
          <button className="modal-close" onClick={handleDeny}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="request-header">
            <div className="app-info">
              <span className="app-icon">{currentRequest.appIcon || '📦'}</span>
              <div>
                <h3>{currentRequest.appName}</h3>
                <p>is requesting permissions</p>
              </div>
            </div>
          </div>

          <div className="permissions-list">
            <h4>Requested Permissions:</h4>
            {currentRequest.permissions.map((perm) => {
              const riskToLevel: Record<PermissionRisk, 'verified' | 'known' | 'unknown' | 'risky'> = {
                [PermissionRisk.LOW]: 'known',
                [PermissionRisk.MEDIUM]: 'unknown',
                [PermissionRisk.HIGH]: 'risky',
                [PermissionRisk.CRITICAL]: 'risky',
              };

              return (
                <div key={perm.id} className={`permission-item risk-${perm.risk}`}>
                  <div className="perm-header">
                    <span className="perm-name">{perm.name}</span>
                    <TrustBadge level={riskToLevel[perm.risk]} showLabel={false} />
                  </div>
                  <p className="perm-description">{perm.description}</p>
                </div>
              );
            })}
          </div>

          <div className="warning">
            <p>
              ⚠️ Review these permissions carefully. Orivon cannot guarantee the safety of any
              app. Grant permissions only to apps you trust.
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={handleDeny}>
            Deny
          </button>
          <button className="btn-primary" onClick={handleGrant}>
            Grant Permissions
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionRequest;

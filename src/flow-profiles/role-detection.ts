import type { FlowDomain } from '../types.js';

/**
 * Infer a domain colour role key from the flow entity id (lowercase substring rules).
 * Returns the first matching role; `generic` never auto-detects.
 */
export function detectFlowRole(entityId: string, domain: FlowDomain | string | undefined): string | undefined {
  if (!entityId || !domain || domain === 'generic') return undefined;
  const id = entityId.toLowerCase();

  switch (domain as FlowDomain) {
    case 'energy': {
      if (id.includes('solar') || id.includes('pv')) return 'solar';
      if (id.includes('grid') || id.includes('meter')) return 'grid';
      if (id.includes('battery') || id.includes('batt')) return 'battery';
      if (id.includes('load') || id.includes('consumption') || id.includes('house') || id.includes('home')) {
        return 'load';
      }
      return undefined;
    }
    case 'water': {
      if (id.includes('supply') || id.includes('main') || id.includes('inlet')) return 'supply';
      if (id.includes('drain') || id.includes('waste') || id.includes('outlet')) return 'drain';
      if (id.includes('storage') || id.includes('tank')) return 'storage';
      if (id.includes('transfer')) return 'transfer';
      return undefined;
    }
    case 'network': {
      if (id.includes('upload')) return 'upload';
      if (id.includes('download')) return 'download';
      if (id.includes('local') || id.includes('lan')) return 'local';
      if (id.includes('external') || id.includes('wan') || id.includes('internet')) return 'external';
      if (id.includes(' tx') || id.includes('_tx') || id.includes('/tx')) return 'upload';
      if (id.includes(' rx') || id.includes('_rx') || id.includes('/rx')) return 'download';
      if (/(?:^|[^a-z])up(?:[^a-z]|$)/.test(id)) return 'upload';
      if (/(?:^|[^a-z])down(?:[^a-z]|$)/.test(id)) return 'download';
      if (/(?:^|[^a-z])tx(?:[^a-z]|$)/.test(id)) return 'upload';
      if (/(?:^|[^a-z])rx(?:[^a-z]|$)/.test(id)) return 'download';
      if (/(?:^|[^a-z])out(?:[^a-z]|$)/.test(id)) return 'upload';
      if (/(?:^|[^a-z])in(?:[^a-z]|$)/.test(id)) return 'download';
      return undefined;
    }
    case 'hvac': {
      if (id.includes('supply') || id.includes('output') || id.includes('heat')) return 'supply';
      if (id.includes('return') || id.includes('extract')) return 'return';
      if (id.includes('fresh') || id.includes('intake')) return 'fresh';
      if (id.includes('exhaust') || id.includes('vent')) return 'exhaust';
      return undefined;
    }
    case 'gas': {
      if (id.includes('inlet') || id.includes('supply') || id.includes('main')) return 'inlet';
      if (id.includes('outlet') || id.includes('output')) return 'outlet';
      if (id.includes('bypass')) return 'bypass';
      if (id.includes('vent') || id.includes('flue')) return 'vent';
      return undefined;
    }
    default:
      return undefined;
  }
}

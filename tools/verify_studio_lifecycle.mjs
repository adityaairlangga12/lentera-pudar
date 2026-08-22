#!/usr/bin/env node

/**
 * Deterministic Project-Local Validator for Lentera Studio OS Lifecycle Foundation (AS5-G3)
 *
 * Uses Node.js built-ins only.
 * Validates integrity, schema invariants, repository locks, routing targets, and safety boundaries.
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const workspaceRoot = process.cwd();

const EXPECTED_FILES = [
  'studio/README.md',
  'studio/project-integration.json',
  'studio/project-integration.schema.json',
  'studio/lifecycle/schemas/work-order.schema.json',
  'studio/lifecycle/schemas/trace.schema.json',
  'studio/lifecycle/schemas/handoff.schema.json',
  'studio/lifecycle/schemas/passport.schema.json',
  'studio/lifecycle/schemas/artifact-lifecycle-record.schema.json',
  'tools/verify_studio_lifecycle.mjs',
];

const EXPECTED_STUDIO_OS_LOCK = {
  repository: 'adityaairlangga12/ai-game-dev-studio-os',
  commit: 'c981fe506495fcb124f1080cbe1fc0547fae0032',
  packageName: 'ai-game-dev-studio-os',
  packageVersion: '0.1.0',
};

const EXPECTED_DOMAINS = [
  {
    id: 'production-domain.art-3d',
    domainKey: 'art-3d',
    targetPath: 'references/04-art-3d/',
  },
  {
    id: 'production-domain.audio',
    domainKey: 'audio',
    targetPath: 'references/06-pipeline-qc/sop-workflow.md',
  },
  {
    id: 'production-domain.narrative',
    domainKey: 'narrative',
    targetPath: 'references/03-narrative/',
  },
  {
    id: 'production-domain.gameplay',
    domainKey: 'gameplay',
    targetPath: 'references/02-gameplay/',
  },
  {
    id: 'production-domain.qa-qc',
    domainKey: 'qa-qc',
    targetPath: 'references/06-pipeline-qc/qa-qc-framework.md',
  },
];

const JSON_FILES = [
  'studio/project-integration.json',
  'studio/project-integration.schema.json',
  'studio/lifecycle/schemas/work-order.schema.json',
  'studio/lifecycle/schemas/trace.schema.json',
  'studio/lifecycle/schemas/handoff.schema.json',
  'studio/lifecycle/schemas/passport.schema.json',
  'studio/lifecycle/schemas/artifact-lifecycle-record.schema.json',
];

const LIFECYCLE_SCHEMA_FILES = [
  'studio/lifecycle/schemas/work-order.schema.json',
  'studio/lifecycle/schemas/trace.schema.json',
  'studio/lifecycle/schemas/handoff.schema.json',
  'studio/lifecycle/schemas/passport.schema.json',
  'studio/lifecycle/schemas/artifact-lifecycle-record.schema.json',
];

const FORBIDDEN_STRINGS = [
  'ControlPlaneAdapter',
  'ControlPlaneOrchestrator',
  'OperationalEvidenceBridge',
  'BlenderServer',
  'blender_server',
  'UnrealEngine',
  'unreal_engine',
  'apiKey',
  'api_key',
  'secretKey',
  'bearerToken',
  'http://localhost',
  'http://127.0.0.1',
];

const ABSOLUTE_PATH_PATTERNS = [
  /^[A-Za-z]:[\\/]/,
  /^\/home\//,
  /^\/Users\//,
  /^\/tmp\//,
  /^\/var\//,
  /^\/etc\//,
];

function runValidation() {
  const issues = [];
  const checks = [];

  function recordCheck(name, passed, detail = '') {
    checks.push({ name, passed, detail });
    if (!passed) {
      issues.push(`FAIL [${name}]: ${detail}`);
    }
  }

  // 1 & 2: Expected files exist and JSON files parse
  const parsedJson = new Map();
  for (const relPath of EXPECTED_FILES) {
    const fullPath = path.join(workspaceRoot, relPath);
    if (!fs.existsSync(fullPath)) {
      recordCheck(`File Existence: ${relPath}`, false, `File not found at ${fullPath}`);
    } else {
      recordCheck(`File Existence: ${relPath}`, true);
    }
  }

  for (const relPath of JSON_FILES) {
    const fullPath = path.join(workspaceRoot, relPath);
    if (fs.existsSync(fullPath)) {
      try {
        const raw = fs.readFileSync(fullPath, 'utf8');
        const parsed = JSON.parse(raw);
        parsedJson.set(relPath, parsed);
        recordCheck(`JSON Parse: ${relPath}`, true);
      } catch (err) {
        recordCheck(`JSON Parse: ${relPath}`, false, `Parse error: ${err.message}`);
      }
    }
  }

  const projInt = parsedJson.get('studio/project-integration.json');
  if (!projInt) {
    issues.push('Fatal: studio/project-integration.json could not be read or parsed');
    printReport(checks, issues);
    process.exit(1);
  }

  // 3, 4, 5: Studio OS Lock validation
  const studioOs = projInt.studioOs;
  if (!studioOs) {
    recordCheck('Studio OS Lock Section', false, 'Missing studioOs property');
  } else {
    recordCheck(
      'Studio OS Repository Lock',
      studioOs.repository === EXPECTED_STUDIO_OS_LOCK.repository,
      `Expected ${EXPECTED_STUDIO_OS_LOCK.repository}, got ${studioOs.repository}`
    );
    recordCheck(
      'Studio OS Commit Lock',
      studioOs.commit === EXPECTED_STUDIO_OS_LOCK.commit,
      `Expected ${EXPECTED_STUDIO_OS_LOCK.commit}, got ${studioOs.commit}`
    );
    recordCheck(
      'Studio OS Package Name Lock',
      studioOs.packageName === EXPECTED_STUDIO_OS_LOCK.packageName,
      `Expected ${EXPECTED_STUDIO_OS_LOCK.packageName}, got ${studioOs.packageName}`
    );
    recordCheck(
      'Studio OS Package Version Lock',
      studioOs.packageVersion === EXPECTED_STUDIO_OS_LOCK.packageVersion,
      `Expected ${EXPECTED_STUDIO_OS_LOCK.packageVersion}, got ${studioOs.packageVersion}`
    );
  }

  // 6: ProjectDescriptor Semantic Identity
  const pd = projInt.projectDescriptor;
  if (!pd) {
    recordCheck('ProjectDescriptor Exists', false, 'Missing projectDescriptor in project-integration.json');
  } else {
    recordCheck(
      'ProjectDescriptor ID',
      pd.id === 'project.lentera-pudar' && pd.project?.id === 'project.lentera-pudar',
      `Expected id and project.id to be project.lentera-pudar, got ${pd.id} / ${pd.project?.id}`
    );
    recordCheck(
      'ProjectDescriptor Kind',
      pd.project?.kind === 'Project',
      `Expected project.kind to be Project, got ${pd.project?.kind}`
    );
    recordCheck(
      'ProjectDescriptor Version',
      pd.version === '1.0.0',
      `Expected version 1.0.0, got ${pd.version}`
    );
    recordCheck(
      'ProjectDescriptor Contract Reference',
      pd.contract?.namespace === 'studio.contracts.as5' &&
      pd.contract?.name === 'generic-contracts' &&
      pd.contract?.version === '1.0.0',
      `Unexpected contract reference: ${JSON.stringify(pd.contract)}`
    );
    recordCheck(
      'ProjectDescriptor Label',
      pd.metadata?.label === 'Lentera Pudar — The First Spark',
      `Expected label 'Lentera Pudar — The First Spark', got '${pd.metadata?.label}'`
    );
  }

  // 7, 8, 9, 10, 11: Production Domains
  const domains = projInt.productionDomains;
  if (!Array.isArray(domains)) {
    recordCheck('ProductionDomains is Array', false, 'productionDomains is not an array');
  } else {
    recordCheck(
      'ProductionDomains Count is Exactly 5',
      domains.length === 5,
      `Expected exactly 5 domains, got ${domains.length}`
    );

    const domainIds = new Set();
    for (const [idx, entry] of domains.entries()) {
      const desc = entry.descriptor;
      const routing = entry.routing;
      const exp = EXPECTED_DOMAINS[idx];

      if (!desc || !routing) {
        recordCheck(`Domain Entry [${idx}] Shape`, false, 'Missing descriptor or routing');
        continue;
      }

      domainIds.add(desc.id);

      recordCheck(
        `Domain [${desc.id}] Kind is ProductionDomain`,
        desc.productionDomain?.kind === 'ProductionDomain',
        `Expected kind ProductionDomain, got ${desc.productionDomain?.kind}`
      );

      recordCheck(
        `Domain [${desc.id}] Contract Reference`,
        desc.contract?.namespace === 'studio.contracts.as5' &&
        desc.contract?.name === 'generic-contracts' &&
        desc.contract?.version === '1.0.0',
        `Unexpected domain contract reference: ${JSON.stringify(desc.contract)}`
      );

      recordCheck(
        `Domain [${desc.id}] Expected ID`,
        desc.id === exp?.id && desc.productionDomain?.id === exp?.id,
        `Expected ${exp?.id}, got ${desc.id}`
      );

      recordCheck(
        `Domain [${desc.id}] Target Authority Path`,
        routing.targetPath === exp?.targetPath,
        `Expected ${exp?.targetPath}, got ${routing.targetPath}`
      );

      // Check authority target path exists on disk
      const targetDiskPath = path.join(workspaceRoot, routing.targetPath.replace(/\/$/, ''));
      const targetExists = fs.existsSync(targetDiskPath);
      recordCheck(
        `Domain Authority Target Exists: ${routing.targetPath}`,
        targetExists,
        `Target path not found on disk: ${targetDiskPath}`
      );
    }

    recordCheck(
      'ProductionDomain IDs Unique',
      domainIds.size === 5,
      `Expected 5 unique IDs, got ${domainIds.size}`
    );
  }

  // 12: Artifact Catalog is empty array
  recordCheck(
    'Artifact Catalog is Empty Array',
    Array.isArray(projInt.artifactCatalog) && projInt.artifactCatalog.length === 0,
    `Expected empty array, got ${JSON.stringify(projInt.artifactCatalog)}`
  );

  // 13: Lifecycle Roots relative and project-local
  const roots = projInt.lifecycle?.roots;
  if (!roots) {
    recordCheck('Lifecycle Roots Section', false, 'Missing lifecycle.roots');
  } else {
    const requiredRoots = ['workOrders', 'traces', 'handoffs', 'passports', 'artifactLifecycleRecords'];
    for (const rKey of requiredRoots) {
      const rVal = roots[rKey];
      const isRelative = typeof rVal === 'string' && !path.isAbsolute(rVal) && !ABSOLUTE_PATH_PATTERNS.some(pat => pat.test(rVal));
      recordCheck(
        `Lifecycle Root Relative: ${rKey}`,
        isRelative,
        `Path ${rVal} is not a valid relative path`
      );
    }
  }

  // 14 & 15: No absolute paths and no forbidden strings / credentials
  for (const relPath of JSON_FILES) {
    const fullPath = path.join(workspaceRoot, relPath);
    if (fs.existsSync(fullPath)) {
      const raw = fs.readFileSync(fullPath, 'utf8');

      // Check forbidden strings
      for (const forbidden of FORBIDDEN_STRINGS) {
        const containsForbidden = raw.includes(forbidden);
        recordCheck(
          `No Forbidden Term [${forbidden}] in ${relPath}`,
          !containsForbidden,
          `Found forbidden string '${forbidden}' in ${relPath}`
        );
      }

      // Check absolute path patterns in json string values
      for (const pattern of ABSOLUTE_PATH_PATTERNS) {
        const matchesPattern = pattern.test(raw);
        recordCheck(
          `No Absolute Path Pattern [${pattern}] in ${relPath}`,
          !matchesPattern,
          `Found absolute path matching ${pattern} in ${relPath}`
        );
      }
    }
  }

  // 16, 17, 18, 19: Check for AS5-G4/G5 leakage in configuration
  const rawProjInt = JSON.stringify(projInt);
  recordCheck(
    'No ControlPlaneAdapter in Config',
    !rawProjInt.includes('ControlPlaneAdapter'),
    'ControlPlaneAdapter found in project-integration.json'
  );
  recordCheck(
    'No OperationalEvidence Bridge in Config',
    !rawProjInt.includes('OperationalEvidenceBridge'),
    'OperationalEvidenceBridge found in project-integration.json'
  );
  recordCheck(
    'No Blender Dispatch in Config',
    !rawProjInt.includes('blender_dispatch') && !rawProjInt.includes('lentera-blender-mcp'),
    'Blender dispatch found in project-integration.json'
  );
  recordCheck(
    'No Unreal Integration in Config',
    !rawProjInt.includes('unreal_dispatch') && !rawProjInt.includes('lentera-ue5-mcp'),
    'Unreal integration found in project-integration.json'
  );

  // 20, 21: Lifecycle schema files declare Draft 2020-12 and closed shapes
  for (const relPath of LIFECYCLE_SCHEMA_FILES) {
    const schemaObj = parsedJson.get(relPath);
    if (schemaObj) {
      recordCheck(
        `Draft 2020-12 Declaration: ${relPath}`,
        schemaObj.$schema === 'https://json-schema.org/draft/2020-12/schema',
        `Expected https://json-schema.org/draft/2020-12/schema, got ${schemaObj.$schema}`
      );
      recordCheck(
        `Closed Shape (additionalProperties: false): ${relPath}`,
        schemaObj.additionalProperties === false,
        `Expected additionalProperties: false in ${relPath}`
      );
    }
  }

  // 22, 23: ArtifactLifecycleRecord specific state machine and conditional rules
  const alrSchema = parsedJson.get('studio/lifecycle/schemas/artifact-lifecycle-record.schema.json');
  if (alrSchema) {
    const stateEnum = alrSchema.properties?.state?.enum;
    recordCheck(
      'ArtifactLifecycleRecord States (DRAFT, VERIFIED, ACCEPTED)',
      Array.isArray(stateEnum) &&
      stateEnum.includes('DRAFT') &&
      stateEnum.includes('VERIFIED') &&
      stateEnum.includes('ACCEPTED') &&
      stateEnum.length === 3,
      `Unexpected state enum: ${JSON.stringify(stateEnum)}`
    );

    recordCheck(
      'ArtifactLifecycleRecord Conditional Validation Present (allOf / if / then)',
      Array.isArray(alrSchema.allOf) && alrSchema.allOf.length >= 3,
      'Expected conditional allOf rules for DRAFT, VERIFIED, ACCEPTED states'
    );
  }

  printReport(checks, issues);
  if (issues.length > 0) {
    process.exit(1);
  }
}

function printReport(checks, issues) {
  const passedCount = checks.filter(c => c.passed).length;
  const failedCount = checks.filter(c => !c.passed).length;

  console.log('=== Lentera Studio Lifecycle Conformance Validator ===');
  console.log(`Workspace: ${workspaceRoot}`);
  console.log(`Checks executed: ${checks.length}`);
  console.log(`Passed: ${passedCount}`);
  console.log(`Failed: ${failedCount}`);
  console.log(`Issues: ${issues.length}`);

  if (issues.length > 0) {
    console.error('\n--- Failures Detected ---');
    for (const issue of issues) {
      console.error(issue);
    }
  } else {
    console.log('\nResult: PASS (All project lifecycle foundation invariants verified)');
  }
}

runValidation();

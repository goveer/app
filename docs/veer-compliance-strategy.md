# Veer HIPAA Compliance and Data Handling Strategy

## 1. HIPAA Status & Requirements

### Business Associate Status
- Veer qualifies as a Business Associate per OCR guidance by:
  - Creating, receiving, maintaining, and transmitting PHI on behalf of covered entities
  - Providing patient management services including scheduling and routing
  - Storing PHI in secured databases

### Compliance Requirements
- Must maintain HIPAA Security Rule safeguards
- Must implement HIPAA Privacy Rule protections
- Must provide breach notifications if required
- Must maintain audit logs of PHI access and modifications
- Must have BAAs with covered entities and relevant subcontractors

## 2. Protected Health Information (PHI) Inventory

### Direct Identifiers
- Patient name
- Patient address (full location data)
- Phone numbers
- Email addresses
- Appointment dates/times

### Clinical/Service Information
- Number of visits (completed/total)
- Specialist category requirements
- Visit history
- Upcoming appointments

### Associated Data
- Zone/territory assignments
- Routing information
- Logistics notes (non-PHI)

## 3. Data Protection Implementation

### Authentication & Access
- Supabase Auth implementation with:
  - Email (magic link/OTP)
  - Google OAuth 
  - MFA via authenticator apps or SMS
  - Role-based access control (RBAC)
  - Session management and timeouts

### Data Storage
- Supabase with HIPAA BAA
- Encrypted storage of PHI
- Segregated data storage:
  - Protected fields encrypted at rest
  - Zone-based location referencing
  - Separate storage of sensitive vs non-sensitive data

### Time-Window Protected Information
```typescript
interface ProtectedPatientInfo {
  id: string;
  patient_id: string;
  encrypted_address: string;
  encrypted_phone: string;
  encrypted_email: string;
}

interface TimeWindowAccess {
  provider_id: string;
  access_start: Date;
  access_end: Date;
  access_reason: string;
  accessed_fields: string[]
}
```

### CSV Import Security
- Secure file upload through encrypted Supabase buckets
- Data validation and sanitization
- Audit logging of import activities
- Secure file deletion after successful import
- Error handling for failed imports

## 4. Data Access Controls

### Default View Restrictions
- Limited to non-PHI data
- Zone-level location data only
- Minimal necessary information display
- Protected fields hidden by default

### Just-in-Time Data Access
- Explicit provider action required to view protected fields
- Time-limited access windows
- Audit logging of all access events
- Automatic re-protection after window expiration

### Location Data Management
- Encrypted storage of exact addresses
- Zone-based general routing
- Grid system for API interactions
- Fuzzy location data for analytics

## 5. Technical Implementation Priorities

### Phase 1: Foundation
- Authentication system setup
- Basic RBAC implementation
- Encrypted data storage
- Audit logging system

### Phase 2: Data Protection
- Time-window access system
- Protected field implementation
- CSV import security
- Location data protection

### Phase 3: Optimization
- Enhanced audit capabilities
- Analytics with de-identified data
- Performance improvements
- User experience refinements

## 6. Compliance Monitoring

### Audit Requirements
- Access attempt tracking
- Protected field access logs
- Import/export activity logs
- User session monitoring
- System security events

### Regular Reviews
- Security assessment schedule
- Compliance audit procedures
- Performance monitoring
- User feedback integration
- System optimization plans

## 7. Future Considerations

### EHR Integration
- Secure API implementation
- Additional data type handling
- Enhanced security measures
- Modified access controls

### Mobile Implementation
- Secure mobile access
- Modified time-window controls
- Location data handling
- Mobile-specific security measures

## 8. Risk Mitigation

### Identified Risks
- PHI exposure during transit
- Unauthorized access attempts
- Data import vulnerabilities
- System performance impacts

### Mitigation Strategies
- Comprehensive encryption
- Strong access controls
- Secure import procedures
- Regular security updates
- Performance optimization

This document serves as a foundation for implementing HIPAA-compliant features while maintaining system usability and efficiency. Regular updates will be required as features are added or modified.

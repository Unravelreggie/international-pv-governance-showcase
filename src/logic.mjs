export const scopes=[
 {id:"SYN-PV-001",product:"SYN-PRODUCT-A",region:"SYN-REGION-A",approval:"registered",agreement:"signed",signatureEvidence:true,owner:"SYN-ROLE-PV",firstSale:"2026-10-01",document:"SYN-DOC-001 v1"},
 {id:"SYN-PV-002",product:"SYN-PRODUCT-B",region:"SYN-REGION-A",approval:"in_review",agreement:"draft",signatureEvidence:false,owner:"SYN-ROLE-LOCAL",firstSale:"2026-08-01",document:"SYN-DOC-002 draft"},
 {id:"SYN-PV-003",product:"SYN-PRODUCT-C",region:"SYN-REGION-B",approval:"registered",agreement:"unknown",signatureEvidence:false,owner:"",firstSale:null,document:"SYN-DOC-003 status unknown"},
 {id:"SYN-PV-004",product:"SYN-PRODUCT-A",region:"SYN-REGION-B",approval:"expired",agreement:"expired",signatureEvidence:true,owner:"SYN-ROLE-PV",firstSale:"2026-07-01",document:"SYN-DOC-004 archived"}
];
const iso=/^\d{4}-\d{2}-\d{2}$/;
export function validDate(value){
 if(typeof value!=="string"||!iso.test(value))return false;
 const date=new Date(value+"T00:00:00Z");
 return Number.isFinite(date.getTime())&&date.toISOString().slice(0,10)===value;
}
export function calendarMonthsBefore(value,months=3){
 if(!validDate(value)||!Number.isInteger(months)||months<0||months>120)return null;
 const [year,month,day]=value.split("-").map(Number);
 const first=new Date(Date.UTC(year,month-1-months,1));
 const last=new Date(Date.UTC(first.getUTCFullYear(),first.getUTCMonth()+1,0)).getUTCDate();
 return new Date(Date.UTC(first.getUTCFullYear(),first.getUTCMonth(),Math.min(day,last))).toISOString().slice(0,10);
}
export function inspectScope(scope,asOf="2026-06-01"){
 const reasons=[];
 if(!validDate(asOf))reasons.push("invalid_as_of");
 if(scope.approval!=="registered")reasons.push("approval_review");
 if(scope.agreement==="unknown")reasons.push("agreement_unknown");
 else if(scope.agreement!=="signed")reasons.push("signature_not_confirmed");
 if(scope.agreement==="signed"&&!scope.signatureEvidence)reasons.push("signed_evidence_missing");
 if(!scope.owner)reasons.push("owner_unassigned");
 const due=calendarMonthsBefore(scope.firstSale);
 if(scope.firstSale!==null&&!due)reasons.push("invalid_sale_date");
 if(due&&validDate(asOf)&&due<=asOf)reasons.push("follow_up_due");
 return {state:reasons.length?"review_required":"ready_for_review",reasons,due};
}
export function visibleScopes(rows,region,view){
 return rows.filter(r=>(region==="all"||r.region===region)&&(view!=="review"||inspectScope(r).state==="review_required"));
}

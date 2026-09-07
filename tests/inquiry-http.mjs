import assert from 'node:assert/strict';
const url='http://localhost:3000/api/inquiry';
const valid={name:'Validation Test',business:'Test Company',email:'test@example.com',whatsapp:'+91 98765 43210',service:'New Website',budget:'₹8k–₹15k',details:'This request should be rejected before reaching the email provider.',references:'',timeline:'Flexible',website:''};
const cases=[
 ['invalid email', {...valid,email:'invalid'}, {},422],
 ['missing required fields', {},{},422],
 ['unsafe reference', {...valid,references:'javascript:alert(1)'},{},422],
 ['cross-origin', valid,{Origin:'https://unrelated.example'},403],
 ['invalid idempotency key',valid,{'Idempotency-Key':'bad'},400],
 ['honeypot',{...valid,website:'spam'}, {},400],
 ['oversized',{...valid,details:'x'.repeat(25000)}, {},413],
];
for(const [label,body,headers,status] of cases){const response=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify(body)});assert.equal(response.status,status,label);const text=await response.text();assert.ok(!/RESEND|stack|api_key/.test(text));console.log(label+': HTTP '+response.status);}
for(const [label,contentType,body,status] of [['malformed JSON','application/json','{',400],['unsupported body','text/plain','test',415]]){const response=await fetch(url,{method:'POST',headers:{'Content-Type':contentType},body});assert.equal(response.status,status);console.log(label+': HTTP '+response.status);}

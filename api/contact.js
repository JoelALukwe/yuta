const {guard,error}=require('./_github');
module.exports=async function handler(req,res){res.setHeader('Cache-Control','no-store');let p;try{p=guard(req,12000)}catch(e){return res.status(e.status||400).json({message:e.message})}
const name=String(p.name||'').trim(),email=String(p.email||'').trim(),message=String(p.message||'').trim();
if(name.length<2||name.length>120||email.length>254||!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)||message.length<5||message.length>5000)return res.status(400).json({message:'Enter a valid name, email and message (5–5000 characters).'});
if(p.website||p.companyWebsite)return res.status(200).json({message:'Thank you. Your message has been received.'});
const apiKey=process.env.RESEND_API_KEY,to=process.env.CONTACT_TO_EMAIL,from=process.env.CONTACT_FROM_EMAIL;
if(!apiKey||!to||!from)return res.status(503).json({message:'Contact form is temporarily unavailable.'});
const esc=v=>String(v).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
try{const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+apiKey,'Content-Type':'application/json'},body:JSON.stringify({from,to:[to],reply_to:email,subject:'SmartPath website enquiry',html:'<p><strong>Name:</strong> '+esc(name)+'</p><p><strong>Email:</strong> '+esc(email)+'</p><p><strong>Message:</strong></p><p>'+esc(message).replace(/\n/g,'<br>')+'</p>'})});if(!r.ok)return res.status(502).json({message:'The message could not be sent right now.'});return res.status(200).json({message:'Thank you. Your message has been sent successfully.'})}catch{return res.status(502).json({message:'The message could not be sent right now.'})}};

import { NextResponse } from "next/server"

export async function GET() {
  const html = `<!DOCTYPE html><html><body><script>
  (async function(){
    try {
      const sess = await fetch('/api/auth/session').then(r=>r.json());
      if(sess && sess.user && sess.user.email){
        const raw = localStorage.getItem('emh_users');
        const users = raw ? JSON.parse(raw) : [];
        let u = users.find(x=>x.email && x.email.toLowerCase()===sess.user.email.toLowerCase());
        if(!u){
          u = { id: Date.now().toString(), email: sess.user.email, name: sess.user.name||sess.user.email, role: 'customer', audience: 'particulier', provider: (sess).provider||'google', createdAt: new Date(), updatedAt: new Date() };
          users.unshift(u);
          localStorage.setItem('emh_users', JSON.stringify(users));
        }
        localStorage.setItem('emh_customer_user', JSON.stringify({ id: u.id, email: u.email, name: u.name, audience: u.audience, createdAt: new Date() }));
      }
      window.location.href = '/products';
    } catch(e){ window.location.href = '/login'; }
  })();
  </script></body></html>`
  return new NextResponse(html, { headers: { "Content-Type": "text/html" } })
} 
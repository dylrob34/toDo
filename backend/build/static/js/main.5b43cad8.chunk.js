(this.webpackJsonpanchor=this.webpackJsonpanchor||[]).push([[0],{23:function(e,t,n){},24:function(e,t,n){},31:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),i=n(17),s=n.n(i),o=(n(23),n(11)),r=n(2),l=(n(24),n(7)),j=n(10),u=n(1),d={marginRight:"5px"},h=function(e){var t=e.userLogin,n=e.error,c=Object(a.useState)({email:"",password:""}),i=Object(l.a)(c,2),s=i[0],r=i[1];return Object(u.jsx)("form",{onSubmit:function(e){e.preventDefault(),t(s)},children:Object(u.jsxs)("div",{className:"form-inner",children:[Object(u.jsx)("h2",{children:"Login"}),""!==n?Object(u.jsx)("div",{className:"error",children:n}):"",Object(u.jsxs)("div",{className:"form-group",children:[Object(u.jsx)("label",{htmlFor:"email",children:"Email: "}),Object(u.jsx)("input",{type:"email",name:"email",id:"email",onChange:function(e){return r(Object(j.a)(Object(j.a)({},s),{},{email:e.target.value}))},value:s.email})]}),Object(u.jsxs)("div",{className:"form-group",children:[Object(u.jsx)("label",{htmlFor:"password",children:"Password: "}),Object(u.jsx)("input",{type:"password",name:"password",id:"password",onChange:function(e){return r(Object(j.a)(Object(j.a)({},s),{},{password:e.target.value}))},value:s.password})]}),Object(u.jsx)("input",{type:"submit",value:"LOGIN",style:d}),Object(u.jsx)(o.a,{to:"/signin",children:"Create Account"})]})})},b=function(){var e=Object(a.useState)({name:"",email:""}),t=Object(l.a)(e,2),n=t[0],c=t[1],i=Object(a.useState)(""),s=Object(l.a)(i,2),o=s[0],r=s[1];return Object(u.jsx)("div",{className:"landing",children:""!==n.email?Object(u.jsxs)("div",{className:"welcome",children:[Object(u.jsxs)("h2",{children:["Welcome, ",Object(u.jsx)("span",{children:n.name})]}),Object(u.jsx)("button",{onClick:function(){console.log("Logged Out."),c({name:"",email:""})},children:"Logout"})]}):Object(u.jsx)(h,{userLogin:function(e){console.log(e),console.log("fetching from: http://"+p+"/api/auth/login"),fetch("http://"+p+"/api/auth/login",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({user:e.email,pass:e.password})}).then((function(e){return e.json()})).then((function(t){!0===t.error?(console.log("The login information didn't match..."),r("The login information didn't match...")):!0===t.login&&c({name:t.name,email:e.email})}))},error:o})})},m=function(){var e=Object(a.useState)(""),t=Object(l.a)(e,2),n=t[0],c=t[1],i=Object(a.useState)(""),s=Object(l.a)(i,2),o=s[0],r=s[1];return Object(u.jsxs)("form",{children:[Object(u.jsx)("h1",{children:"Create Your Account"}),Object(u.jsxs)("div",{children:[Object(u.jsx)("label",{htmlFor:"email",children:"Email: "}),Object(u.jsx)("input",{type:"text",name:"email",id:"email",placeholder:"Your Email...",value:n,onChange:function(e){c(e.target.value)}})]}),Object(u.jsxs)("div",{children:[Object(u.jsx)("label",{htmlFor:"password",children:"Create Password: "}),Object(u.jsx)("input",{type:"text",name:"password",id:"password",placeholder:"Create Password...",value:o,onChange:function(e){r(e.target.value)}})]}),Object(u.jsx)("input",{type:"submit"})]})},p="localhost";var O=function(){return Object(u.jsx)(o.a,{children:Object(u.jsx)("div",{className:"App",children:Object(u.jsxs)(r.c,{children:[Object(u.jsx)(r.a,{exact:!0,path:"/",component:b}),Object(u.jsx)(r.a,{exact:!0,path:"/signin",component:m})]})})})},x=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,32)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,i=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),i(e),s(e)}))};s.a.render(Object(u.jsx)(c.a.StrictMode,{children:Object(u.jsx)(O,{})}),document.getElementById("root")),x()}},[[31,1,2]]]);
//# sourceMappingURL=main.5b43cad8.chunk.js.map
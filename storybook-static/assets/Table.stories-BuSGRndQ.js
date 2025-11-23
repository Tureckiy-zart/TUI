"use client";
import{j as e}from"./jsx-runtime-0-JxQnzY.js";import"./index--tQcscZa.js";import{c as b}from"./utils-CyawMXzk.js";const o=({data:a,columns:l,rowKey:g,className:x})=>e.jsx("div",{className:b("overflow-x-auto",x),children:e.jsxs("table",{className:"w-full border-collapse",children:[e.jsx("thead",{children:e.jsx("tr",{className:"border-b",children:l.map(r=>e.jsx("th",{className:"p-sm text-left font-medium text-muted-foreground",children:r.title},String(r.key)))})}),e.jsx("tbody",{children:a.map(r=>e.jsx("tr",{className:"border-b hover:bg-muted/50",children:l.map(t=>e.jsx("td",{className:"p-sm",children:t.render?t.render(r[t.key],r):String(r[t.key])},String(t.key)))},String(r[g])))})]})});try{o.displayName="Table",o.__docgenInfo={description:"",displayName:"Table",props:{data:{defaultValue:null,description:"",name:"data",required:!0,type:{name:"T[]"}},columns:{defaultValue:null,description:"",name:"columns",required:!0,type:{name:"TableColumn<T>[]"}},rowKey:{defaultValue:null,description:"",name:"rowKey",required:!0,type:{name:"string | number | symbol"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string | undefined"}}}}}catch{}const N={title:"Components/Table",component:o,parameters:{layout:"padded"},tags:["autodocs"]},y=[{id:1,name:"John Doe",email:"john@example.com",role:"Admin"},{id:2,name:"Jane Smith",email:"jane@example.com",role:"User"},{id:3,name:"Bob Johnson",email:"bob@example.com",role:"Moderator"}],n={args:{data:y,columns:[{key:"name",title:"Name"},{key:"email",title:"Email"},{key:"role",title:"Role"}],rowKey:"id"}},s={args:{data:y,columns:[{key:"name",title:"Name"},{key:"email",title:"Email"},{key:"role",title:"Role",render:a=>e.jsx("span",{className:`rounded px-sm py-xs text-xs ${a==="Admin"?"bg-error/20 text-error-foreground":a==="Moderator"?"bg-warning/20 text-warning-foreground":"bg-success/20 text-success-foreground"}`,children:a})}],rowKey:"id"}};var d,m,i;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    data: sampleData,
    columns: [{
      key: "name",
      title: "Name"
    }, {
      key: "email",
      title: "Email"
    }, {
      key: "role",
      title: "Role"
    }],
    rowKey: "id"
  }
}`,...(i=(m=n.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};var c,u,p;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    data: sampleData,
    columns: [{
      key: "name",
      title: "Name"
    }, {
      key: "email",
      title: "Email"
    }, {
      key: "role",
      title: "Role",
      render: value => <span className={\`rounded px-sm py-xs text-xs \${value === "Admin" ? "bg-error/20 text-error-foreground" : value === "Moderator" ? "bg-warning/20 text-warning-foreground" : "bg-success/20 text-success-foreground"}\`}>
            {value}
          </span>
    }],
    rowKey: "id"
  }
}`,...(p=(u=s.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};const j=["Default","WithCustomRender"];export{n as Default,s as WithCustomRender,j as __namedExportsOrder,N as default};

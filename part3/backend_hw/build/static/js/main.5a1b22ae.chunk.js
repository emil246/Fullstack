(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(13),c=t.n(r),u=(t(19),t(2)),i=t(3),l=t.n(i),m="/api/persons",s=function(){return l.a.get(m).then((function(e){return e.data}))},d=function(e){return l.a.post(m,e).then((function(e){return e.data}))},f=function(e){return l.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},h=function(e,n){return l.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},b=function(e){var n=e.message,t=e.info;return null===n?null:o.a.createElement("div",{style:t?{color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}:{color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10}},n)},g=function(e){var n=e.value,t=e.onChange;return o.a.createElement("div",null,"filter show with:",o.a.createElement("input",{value:n,onChange:t}))},v=function(e){var n=e.persons,t=e.personRemove;return n?(console.log(n),o.a.createElement("div",null,n.map((function(e,n){return o.a.createElement("p",{key:n},e.name," ",e.number,o.a.createElement("button",{onClick:function(){return t(e.id)}},"Delete"))})))):(console.log("\u0425\u0443\u0439"),o.a.createElement("div",null))},p=function(e){var n=e.onSubmit,t=e.name,a=e.number,r=e.onNameChange,c=e.onNumberChange;return o.a.createElement("form",{onSubmit:n},o.a.createElement("div",null,"name: ",o.a.createElement("input",{value:t,onChange:r})),o.a.createElement("div",null,"number: ",o.a.createElement("input",{value:a,onChange:c})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add")))},E=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],r=n[1],c=Object(a.useState)(""),i=Object(u.a)(c,2),l=i[0],m=i[1],E=Object(a.useState)(""),w=Object(u.a)(E,2),S=w[0],j=w[1],O=Object(a.useState)(""),y=Object(u.a)(O,2),k=y[0],C=y[1],P=Object(a.useState)(null),T=Object(u.a)(P,2),N=T[0],B=T[1],R=Object(a.useState)(!0),D=Object(u.a)(R,2),z=D[0],J=D[1];Object(a.useEffect)((function(){s().then((function(e){r(e)}))}),[]);var W=k?t.filter((function(e){return-1!==e.name.toLowerCase().search(k)})):t;return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(b,{message:N,info:z}),o.a.createElement(g,{value:k,onChange:function(e){console.log(W),C(e.target.value)}}),o.a.createElement("p",null),o.a.createElement(p,{onSubmit:function(e){e.preventDefault();var n=t.some((function(e){return e.name===l})),a={name:l,number:S};if(n){var o=t.filter((function(e){return e.name===l}))[0];window.confirm("".concat(o.name," already added, replace?"))&&h(o.id,a).then((function(e){m(""),j(""),s().then((function(e){r(e)})),B("Person ".concat(o.name," updated")),setTimeout((function(){B(null)}),5e3)})).catch((function(){B("Person ".concat(o.name," already deleted")),J(!1),setTimeout((function(){B(null),J(!0)}),5e3),r(t.filter((function(e){return e.name!==l})))}))}else d(a).then((function(e){r(t.concat(e)),m(""),j(""),B("Person ".concat(e.name," was added to server")),setTimeout((function(){B(null)}),5e3)})).catch((function(e){B("".concat(e.response.data.error)),J(!1),setTimeout((function(){B(null),J(!0)}),5e3),console.log(e.response.data)}))},name:l,number:S,onNameChange:function(e){m(e.target.value)},onNumberChange:function(e){j(e.target.value)}}),o.a.createElement("h2",null,"Numbers"),o.a.createElement(v,{persons:W,personRemove:function(e){var n=t.find((function(n){return n.id===e}));window.confirm("Delete ".concat(n.name,"?"))&&f(e).then((function(){var a=t.filter((function(n){return n.id!==e}));r(a),B("Person ".concat(n.name," deleted")),J(!0),setTimeout((function(){B(null)}),5e3)})).catch((function(){B("Person ".concat(n.name," already deleted")),J(!1),setTimeout((function(){B(null),J(!0)}),5e3),r(t.filter((function(n){return n.id!==e})))}))}}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[14,1,2]]]);
//# sourceMappingURL=main.5a1b22ae.chunk.js.map
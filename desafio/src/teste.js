
const nome = [
{
    "id":1,
    "nome":"gustavo"
},
{
    "id":2,
    "nome":"garcia"
}
]
var nome1="f";
const novo = nome.map(x=>{
    if(x["id"] == 1){
        x["nome"] = nome1 ? nome1:x["nome"]
    }
    return x
})
console.log(novo)
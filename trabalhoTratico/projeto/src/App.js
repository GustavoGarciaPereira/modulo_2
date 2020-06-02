import fs from "fs";

function separar_arquivos_estados(){
    const cidades = './Cidades.json'
    const estados = './Estados.json'

    var CidadesData = fs.readFileSync(cidades, "utf8");
    var EstadosData = fs.readFileSync(estados, "utf8");


    //cidade
    var dados_cidades = JSON.parse(CidadesData)

    //estado
    var dados_estados = JSON.parse(EstadosData)
    dados_estados.map((estado)=>{
 
        salvar_dados(estado.Sigla,{
            "ID":estado.ID,
            "Sigla": estado.Sigla,
            "Nome": estado.Nome
        })
    })
}


function salvar_dados(nome,dados){
    fs.writeFile(`./dados_gerados/${nome}.json`,`
    {
    "ID":${dados.ID},
    "Sigla": "${dados.Sigla}",
    "Nome": "${dados.Nome}"
    }
    `, function(erro) {

    if(erro) {
        throw erro;
    }

    console.log("Arquivo salvo");
}); 
}

//questao 2
function contar_cidades(){
    const cidades = './Cidades.json'
    const estados = './Estados.json'

    var CidadesData = fs.readFileSync(cidades, "utf8");
    var EstadosData = fs.readFileSync(estados, "utf8");

    //cidade
    var dados_cidades = JSON.parse(CidadesData)

    //estado
    var dados_estados = JSON.parse(EstadosData)
    var contagem = 0;
    dados_estados.map((estado)=>{
        dados_cidades.map((cidade)=>{
            if(estado.ID == cidade.Estado){
                //console.log("<>",cidade.Nome)
                contagem +=1
            }
        })
        console.log(`Estado ${estado.Nome} Numero de Cidades ${contagem}`)
        contagem = 0
        console.log("==================")
    })
}

function contar_cidades_sigra(sigla){
    const cidades = './Cidades.json'
    const estados = './Estados.json'

    var CidadesData = fs.readFileSync(cidades, "utf8");
    var EstadosData = fs.readFileSync(estados, "utf8");

    //cidade
    var dados_cidades = JSON.parse(CidadesData)

    //estado
    var dados_estados = JSON.parse(EstadosData)
    var contagem = 0;
    dados_estados.forEach(estado => {
        dados_cidades.map((cidade)=>{
            if(estado.Sigla==sigla){
                if(cidade.Estado == estado.ID){
                    contagem +=1
                }
                
            }
        })
    });
    return contagem
    //dados_estados.map((estado)=>{
    //    dados_cidades.map((cidade)=>{
    //        if(estado.ID == cidade.Estado){
    //            //console.log("<>",cidade.Nome)
    //            contagem +=1
    //        }
    //    })
    //    //console.log(`Estado ${estado.Nome} Numero de Cidades ${contagem}`)
    //    contagem = 0
    //    //console.log("==================")
    //})
}


function cinco_estados_mais_cidades(){
    const cidades = './Cidades.json'
    const estados = './Estados.json'

    var CidadesData = fs.readFileSync(cidades, "utf8");
    var EstadosData = fs.readFileSync(estados, "utf8");
    var lista=[]
    var Estados = JSON.parse(EstadosData)
    Estados.forEach(estado => {
        lista.push(
            `{"Sigla":"${estado.Sigla}","numero_de_cidades":${contar_cidades_sigra(estado.Sigla)}}`
            )
    });

    var dados_cidades = JSON.parse(lista)
    console.log(">",dados_cidades)
    let lista_ordenada = ordenar(lista)
    console.log(lista_ordenada)
}

function ordenar(lista){
    lista.sort(function (a, b) {
        if (a.numero_de_cidades > b.numero_de_cidades) {
          return 1;
        }
        if (a.numero_de_cidades < b.numero_de_cidades) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      return lista
}

//contar_cidades()
cinco_estados_mais_cidades()
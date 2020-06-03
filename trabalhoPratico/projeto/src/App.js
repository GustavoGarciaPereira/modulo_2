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
    var oestado = new Object();
    Estados.forEach(estado => {

        oestado["Sigla"] = `${estado.Sigla}`;
        oestado["numero_de_cidades"] = contar_cidades_sigra(estado.Sigla);
        lista.push(oestado)
        oestado = {}
    });

    //var dados_cidades = JSON.parse(lista)
    //console.log(">",dados_cidades)
    
    
    //let lista_ordenadaDecr = ordenarDecr(lista1)
    
    
    //let lista_ordenadaCre = ordenarCre(lista2)

    ordenarDecr(lista)
    ordenarCre(lista)


}

//cre
function ordenarCre(lista){
    //crescente
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

    console.log(formatar_saida(lista.slice(0,5)).reverse()) 
}

//decre
function ordenarDecr(lista){

    //decrescente
    lista.sort(function (a, b) {
        if (a.numero_de_cidades < b.numero_de_cidades) {
          return 1;
        }
        if (a.numero_de_cidades > b.numero_de_cidades) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      console.log(formatar_saida(lista.slice(0,5))) 
}

function formatar_saida(lista){
    var nova_lista = []
    lista.map((l)=>{
        nova_lista.push(`${l.Sigla}-${l.numero_de_cidades}`)
    })
    return nova_lista
}


//Criar um método que imprima no console um array com 
//a cidade de maior nome de cada estado, seguida de seu UF. 
//Em caso de empate, considerar a ordem alfabética para ordená-los e 
//então retornar o primeiro. Por exemplo: 
//[“Nome da Cidade – UF”, “Nome da Cidade – UF”, ...].

function maior_cidade(){
    const cidades = './Cidades.json'
    const estados = './Estados.json'

    var CidadesData = fs.readFileSync(cidades, "utf8");
    var EstadosData = fs.readFileSync(estados, "utf8");
    var lista=[]

    var Estados = JSON.parse(EstadosData)
    var Cidades = JSON.parse(CidadesData)
    var estadoCidade = new Object();
    Estados.forEach(estado => {
        Cidades.forEach(cidade =>{
            if (estado.ID == cidade.Estado){
                estadoCidade["Sigla"] = `${estado.Sigla}`;
                estadoCidade["nome_cidade"] = `${cidade.Nome}`;
                lista.push(estadoCidade)
                estadoCidade = {}
            }
        });

    });

    //var dados_cidades = JSON.parse(lista)
    //console.log(">",dados_cidades)
    
    
    //let lista_ordenadaDecr = ordenarDecr(lista1)
    
    
    //let lista_ordenadaCre = ordenarCre(lista2)

    ordena_nomes(lista)
}

function ordena_nomes(lista){
    console.log(lista)


    lista.sort(function (a, b) {
        if (a.nome_cidade.length > b.nome_cidade.length) {
          return 1;
        }
        if (a.nome_cidade.length < b.nome_cidade.length) {
          return -1;
        }
        if (a.nome_cidade.length == b.nome_cidade.length) {
            
            if (a.nome_cidade > b.nome_cidade) {
                return 1;
            }
            if (a.nome_cidade < b.nome_cidade) {
                return -1;
            }
        }
         
        return 0;
    });

    console.log(formatar_saida_cidades(lista))
}

function formatar_saida_cidades(lista){
    var nova_lista = []
    lista.map((l)=>{
        nova_lista.push(`${l.Sigla}-${l.nome_cidade}`)
    })
    return nova_lista
}
//contar_cidades()
//cinco_estados_mais_cidades()
maior_cidade()
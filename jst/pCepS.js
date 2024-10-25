//Pega CEP e bandeiras:
var checkLang = document.cookie;
var Cvazio = "Campo não preenchido";
var Cnf ="CEP não encontrado";
var Cerr = "CEP inválido";

const pega = ()=>{
    const cep = document.getElementById('cep').value;
    const cepNC = cep.length;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
   
    if(cep != "" && cepNC > 7 && cepNC < 10){
        fetch(url)
        .then(res => res.json())
        .then(data => displayCep(data));
    }else if(cep == ""){
        window.alert(Cvazio);
    }else{
        window.alert(Cerr);
    }
}
const displayCep = cep => {
    if(cep.erro == 'true'){
        window.alert(Cnf);
    }else{
        console.log(cep);
        const estado = cep.uf;
        const municipio = cep.ibge;

        const bandeiraEstado = document.getElementById("bandEstado");
        const imgMun = document.getElementById("imgMunicipio");
        const imgEstado = document.getElementById("imgEstado");

        bandeiraEstado.src="imgs/bandEstados/"+estado+".png";
        bandeiraEstado.height = 100;

        document.getElementById('cidade').innerHTML = cep.localidade +" - "+ cep.uf;
        document.getElementById('bairro').innerHTML = cep.bairro;
        document.getElementById('logradouro').innerHTML = cep.logradouro;
        document.getElementById('ddd').innerHTML = "DDD: "+cep.ddd;
        document.getElementById('complemento').innerHTML = cep.complemento;
        
        imgMun.src="https://servicodados.ibge.gov.br/api/v3/malhas/municipios/"+municipio+"?formato=image/svg+xml&qualidade=maxima";
        imgMun.height = 200;
        imgMun.width = 200;
        
        imgEstado.src="https://servicodados.ibge.gov.br/api/v3/malhas/estados/"+estado+"?formato=image/svg+xml&qualidade=maxima";
        imgEstado.height = 200;
        imgEstado.width = 200;
        
        
        
    }
}
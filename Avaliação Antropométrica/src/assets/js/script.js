function startEvaluation() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('form-container').classList.remove('hidden');
}

function nextStep(stepNumber) {
    document.getElementById('step' + stepNumber).classList.add('hidden');
    
    const nextStep = stepNumber + 1;
    document.getElementById('step' + nextStep).classList.remove('hidden');
}

document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll(".meta");
    
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            let checkedCount = document.querySelectorAll(".meta:checked").length;

            if (checkedCount > 5) {
                this.checked = false; // Desmarca se já houver 5 selecionados
                alert("Você só pode selecionar até 5 metas!");
            }
        });
    });
});

function getSelectedMetas() {
    let metasSelecionadas = [];
    document.querySelectorAll(".meta:checked").forEach(meta => {
        metasSelecionadas.push(meta.value);
    });
    return metasSelecionadas;
}

function calcularResultados() {
    const altura = parseFloat(document.getElementById("altura").value) / 100;
    const peso = parseFloat(document.getElementById("peso").value);
    const genero = document.getElementById("genero").value;

    // Dados de dobras cutâneas (em mm)
    const abdominal = parseFloat(document.getElementById("abdominal").value);
    const triceps = parseFloat(document.getElementById("triceps").value);
    const suprailíaca = parseFloat(document.getElementById("suprailíaca").value);
    const subescapular = parseFloat(document.getElementById("subescapular").value);
    const torax = parseFloat(document.getElementById("torax").value);
    const coxaDobra = parseFloat(document.getElementById("coxa_dobra").value);

    // Soma das dobras cutâneas
    const somaDobras = abdominal + triceps + suprailíaca + subescapular + torax + coxaDobra;

    // Fórmula de Jackson e Pollock (para mulheres e homens)
    let percentualGordura;
    if (genero === "Feminino") {
        percentualGordura = (0.2967 * somaDobras) - 0.00043 * (somaDobras * somaDobras) - 0.02963 * peso + 1.4072; // Para mulheres
    } else if (genero === "Masculino") {
        percentualGordura = (0.29288 * somaDobras) - 0.0005 * (somaDobras * somaDobras) - 0.02963 * peso + 1.098; // Para homens
    }

    // Cálculos de massa gorda e massa magra
    let massaGorda = (peso * (percentualGordura / 100)).toFixed(2);
    let massaMagra = (peso - massaGorda).toFixed(2);
    let percentMassaGorda = percentualGordura.toFixed(2);
    let percentMassaMagra = (100 - percentualGordura).toFixed(2);
    let razaoCinturaQuadril = (parseFloat(document.getElementById("cintura").value) / parseFloat(document.getElementById("quadril").value)).toFixed(2);

    // Exibição dos resultados atuais
    document.getElementById("imc").innerText = (peso / (altura * altura)).toFixed(2);
    document.getElementById("pesoAtual").innerText = peso + "kg";
    document.getElementById("massaGorda").innerText = massaGorda;
    document.getElementById("percentMassaGorda").innerText = percentMassaGorda + "%";
    document.getElementById("massaMagra").innerText = massaMagra;
    document.getElementById("percentMassaMagra").innerText = percentMassaMagra + "%";
    document.getElementById("razaoCinturaQuadril").innerText = razaoCinturaQuadril;
}

function calcularResultadoIdeal() {
    const peso = parseFloat(document.getElementById("peso").value);
    const genero = document.getElementById("genero").value;
    const altura = parseFloat(document.getElementById("altura").value) / 100;
    const percentualGorduraAtual = parseFloat(document.getElementById("percentMassaGorda").innerText);
    const metas = getSelectedMetas();

    let percentualIdealGordura;
    
    if (genero === "Masculino") {
        if (percentualGorduraAtual > 35) {
            percentualIdealGordura = 22;
        } else if (percentualGorduraAtual > 30) {
            percentualIdealGordura = 20;
        } else {
            percentualIdealGordura = 17;
        }
    } else {
        if (percentualGorduraAtual > 40) {
            percentualIdealGordura = 28;
        } else if (percentualGorduraAtual > 35) {
            percentualIdealGordura = 25;
        } else {
            percentualIdealGordura = 20;
        }
    }

    const ajustesMetas = {
        "Emagrecimento": -2,
        "Hipertrofia": 1,
        "Definição Muscular": -1,
        "Ganho de Força": 1,
        "Melhoria da Resistência Física": 0,
        "Manutenção do Peso": 0, 
        "Melhoria da Postura": 0,
        "Aumento da Flexibilidade": 0,
        "Redução do Estresse e Ansiedade": 0,
        "Melhoria na Qualidade do Sono": 0,
        "Aprimoramento da Mobilidade": 0,
        "Melhoria da Coordenação Motora": 0,
        "Aumento da Capacidade Aeróbica": 0,
        "Maior Explosão e Potência Muscular": 1,
        "Desenvolvimento da Agilidade": 1,
        "Preparação para Competições": 1,
        "Reabilitação de Lesões": 0,
        "Melhoria da Saúde Cardiovascular": 0,
        "Prevenção de Doenças": 0,
        "Longevidade e Qualidade de Vida": 0
    };

    metas.forEach(meta => {
        if (ajustesMetas[meta] !== undefined) {
            percentualIdealGordura += ajustesMetas[meta];
        }
    });

    percentualIdealGordura = Math.max(percentualIdealGordura, genero === "Masculino" ? 14 : 19.5);
    
    let imcIdeal = genero === "Masculino" ? 24 : 22.5;
    if (percentualGorduraAtual > 30) {
        imcIdeal = genero === "Masculino" ? 25 : 23;
    }

    let pesoIdeal = (altura * altura * imcIdeal).toFixed(2);
    let massaGordaIdeal = ((pesoIdeal * percentualIdealGordura) / 100).toFixed(2);
    let massaMagraIdeal = (pesoIdeal - massaGordaIdeal).toFixed(2);
    let percentualMagraIdeal = (100 - percentualIdealGordura).toFixed(2);

    document.getElementById("massaGordaIdeal").innerText = massaGordaIdeal + "kg";
    document.getElementById("percentMassaGordaIdeal").innerText = percentualIdealGordura + "%";
    document.getElementById("massaMagraIdeal").innerText = massaMagraIdeal + "kg";
    document.getElementById("percentMassaMagraIdeal").innerText = percentualMagraIdeal + "%";
    document.getElementById("pesoIdeal").innerText = pesoIdeal + "kg";

    let mensagemMotivacional = "";
    if (percentualGorduraAtual > percentualIdealGordura + 5) {
        mensagemMotivacional = "Seu objetivo está bem definido! Pequenas mudanças nos hábitos diários já farão diferença.";
    } else if (percentualGorduraAtual > percentualIdealGordura + 2) {
        mensagemMotivacional = "Você está no caminho certo! Continue firme e logo alcançará seu percentual ideal.";
    } else if (percentualGorduraAtual > percentualIdealGordura) {
        mensagemMotivacional = "Ótimo! Falta pouco para atingir seu objetivo, mantenha a consistência!";
    } else {
        mensagemMotivacional = "Parabéns! Você já atingiu ou está muito próximo do seu objetivo! Continue assim!";
    }

    document.getElementById("mensagemMotivacional").innerText = mensagemMotivacional;
}
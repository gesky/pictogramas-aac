// Dicionário PT-BR → ID numérico ARASAAC
// Fonte: https://api.arasaac.org  |  Licença pictogramas: CC BY-NC-SA (Sergio Palao / Governo de Aragão)
const DIC = {
  // === PRONOMES ===
  "eu": 25558, "você": 38456, "ele": 7683, "ela": 7680,
  "nós": 16317, "eles": 7684, "elas": 7684,
  "meu": 15356, "minha": 15356, "seu": 20754, "sua": 20754,
  "nosso": 16318, "nossa": 16318, "este": 8318, "essa": 8315,
  "isso": 12033, "aqui": 4376, "ali": 4142,

  // === VERBOS - necessidades básicas ===
  "comer": 2080, "beber": 3185, "dormir": 19929, "acordar": 2066,
  "tomar banho": 4968, "banho": 4968, "escovar": 8231,
  "ir banheiro": 4969, "banheiro": 4969, "xixi": 24080, "cocô": 5990,
  "vestir": 23993, "tomar remédio": 19520, "remédio": 19520,

  // === VERBOS - movimento ===
  "ir": 27495, "vir": 25040, "andar": 4163, "correr": 6540,
  "pular": 18900, "parar": 17352, "sentar": 20720, "levantar": 13828,
  "deitar": 6973, "chegar": 5872, "sair": 20140, "entrar": 8286,
  "subir": 22520, "descer": 7022,

  // === VERBOS - comunicação e cognição ===
  "falar": 8825, "dizer": 7439, "perguntar": 18377, "responder": 19625,
  "ouvir": 16758, "ver": 38459, "olhar": 16717, "ler": 13651,
  "escrever": 8233, "pensar": 17292, "lembrar": 13667, "saber": 20104,
  "entender": 8283, "ajudar": 4819, "pedir": 17163, "chamar": 5807,

  // === VERBOS - atividades ===
  "brincar": 5082, "jogar": 12761, "estudar": 8227, "trabalhar": 23429,
  "desenhar": 7033, "pintar": 17478, "cantar": 5592, "dançar": 6697,
  "assistir": 22487, "ouvir música": 16040, "ler livro": 14161,
  "escovar dente": 7857, "lavar mão": 13443, "lavar": 13443,
  "comprar": 5979, "cozinhar": 6524, "arrumar": 4415,

  // === VERBOS - estados e desejos ===
  "querer": 38514, "precisar": 18303, "gostar": 10434, "amar": 4148,
  "poder": 18232, "deixar": 6976, "ter": 23082, "dar": 6862,
  "pegar": 17173, "colocar": 6083, "tirar": 23153, "abrir": 2058,
  "fechar": 8847, "ligar": 14023, "desligar": 7033, "esperar": 8303,
  "acabar": 2062, "começar": 6093, "continuar": 6293,

  // === SUBSTANTIVOS - pessoas ===
  "mãe": 15025, "pai": 16923, "bebê": 5005, "criança": 6586,
  "menino": 15298, "menina": 15295, "homem": 11554, "mulher": 16003,
  "professor": 18417, "médico": 15315, "amigo": 4138, "família": 8896,
  "bebê": 5005, "avó": 4536, "avô": 4535, "irmão": 11995, "irmã": 11994,

  // === SUBSTANTIVOS - corpo ===
  "cabeça": 5627, "cabelo": 5543, "rosto": 19978, "olho": 16718,
  "nariz": 16228, "boca": 5040, "ouvido": 16757, "orelha": 16757,
  "mão": 14977, "braço": 5077, "perna": 17306, "pé": 17291,
  "barriga": 4975, "costas": 6516, "dente": 7023,

  // === SUBSTANTIVOS - saúde e sentimentos ===
  "dor": 7496, "febre": 9028, "fome": 9740, "sede": 20699,
  "sono": 21739, "cansado": 5765, "doente": 7486,
  "hospital": 11541, "farmácia": 8986,

  // === SUBSTANTIVOS - alimentação ===
  "água": 4038, "leite": 14066, "suco": 22507, "café": 5560,
  "chá": 5820, "pão": 17240, "arroz": 4413, "feijão": 9004,
  "macarrão": 14786, "sopa": 21766, "frango": 9652, "carne": 5719,
  "peixe": 17162, "ovo": 16832, "queijo": 19089, "manteiga": 14930,
  "iogurte": 12634, "fruta": 9690, "verdura": 23992, "salada": 20198,
  "banana": 4956, "maçã": 15607, "laranja": 13307, "uva": 23758,
  "morango": 15837, "melancia": 15324, "manga": 14957,
  "bolo": 5096, "sorvete": 21959, "biscoito": 5022, "chocolate": 5936,
  "lanche": 13257, "comida": 6094, "almoço": 4134, "jantar": 12621,
  "café da manhã": 5561, "sobremesa": 21718,

  // === SUBSTANTIVOS - lugares ===
  "casa": 4374, "escola": 8225, "quarto": 19121, "sala": 20193,
  "cozinha": 6522, "banheiro": 4969, "jardim": 12623,
  "parque": 17125, "mercado": 15319, "supermercado": 15319,
  "shopping": 20845, "restaurante": 19644, "lanchonete": 13257,
  "banco": 4960, "correio": 6494, "igreja": 11890, "praça": 18420,
  "rua": 20003, "cidade": 5969,

  // === SUBSTANTIVOS - objetos cotidianos ===
  "cama": 5561, "mesa": 15307, "cadeira": 5550, "sofá": 21726,
  "copo": 6515, "prato": 18428, "colher": 6079, "garfo": 9832,
  "faca": 12578, "tigela": 23149, "panela": 17096,
  "livro": 14161, "lápis": 13284, "caneta": 5661, "caderno": 5556,
  "mochila": 15761, "borracha": 5058, "tesoura": 23082, "régua": 19520,
  "brinquedo": 5083, "bola": 5048, "boneca": 5054,
  "computador": 6158, "tablet": 22857, "celular": 5808,
  "televisão": 23060, "tv": 23060, "rádio": 19201,
  "roupa": 19939, "camiseta": 5595, "calça": 5574, "sapato": 20441,
  "meia": 15278, "casaco": 5724, "chapéu": 5832,
  "óculos": 16697, "bolsa": 5048,

  // === SUBSTANTIVOS - natureza ===
  "sol": 21766, "lua": 14661, "estrela": 8460, "chuva": 5958,
  "nuvem": 16613, "vento": 23952, "frio": 9664, "calor": 5583,
  "árvore": 4487, "flor": 9310, "grama": 10171, "folha": 9325,
  "mar": 14964, "rio": 19811, "montanha": 15826,

  // === SUBSTANTIVOS - animais ===
  "cachorro": 5542, "gato": 9881, "peixe": 17162, "pássaro": 17153,
  "coelho": 6054, "hamster": 11152, "tartaruga": 22934,
  "vaca": 23736, "cavalo": 5751, "frango": 9652, "elefante": 8069,
  "leão": 13546, "macaco": 14790,

  // === ADJETIVOS - estados emocionais ===
  "feliz": 9115, "triste": 23120, "bravo": 5079, "com medo": 9839,
  "calmo": 5582, "nervoso": 16257, "assustado": 4479,
  "animado": 4164, "entediado": 8281, "surpreso": 22563,
  "envergonhado": 8285,

  // === ADJETIVOS - físicos ===
  "grande": 10169, "pequeno": 17302, "alto": 4135, "baixo": 4954,
  "pesado": 17362, "leve": 13696, "rápido": 19227, "devagar": 7050,
  "quente": 19133, "frio": 9664, "limpo": 14031, "sujo": 22579,
  "novo": 16431, "velho": 23889, "cheio": 5869, "vazio": 23769,
  "bonito": 5059, "feio": 9041, "bom": 5057, "ruim": 20008,
  "fácil": 8860, "difícil": 7435, "duro": 7836, "mole": 15784,
  "aberto": 2059, "fechado": 8846,

  // === COMUNICAÇÃO SOCIAL ===
  "sim": 22466, "não": 16359, "por favor": 38710, "obrigado": 35059,
  "oi": 16690, "olá": 16690, "tchau": 23052, "desculpa": 7025,
  "parabéns": 17104, "ajuda": 4819, "atenção": 4496, "pronto": 18580,
  "não sei": 16188, "mais": 14895, "chega": 5868, "espera": 8303,

  // === TEMPO ===
  "hoje": 11528, "amanhã": 4143, "ontem": 16764, "agora": 16430,
  "depois": 7051, "antes": 4310, "manhã": 14939, "tarde": 22885,
  "noite": 16428, "hora": 11548, "semana": 20697, "mês": 15354,
  "ano": 4243, "cedo": 5756, "tarde": 22885, "sempre": 20757,
  "nunca": 16614, "às vezes": 22558,

  // === QUANTIDADES ===
  "muito": 16010, "pouco": 18238, "mais": 14895, "menos": 15303,
  "tudo": 23409, "nada": 16186, "todos": 23222, "outro": 16837,
  "primeiro": 18482, "último": 23513, "junto": 12762,

  // === DIREÇÕES E POSIÇÕES ===
  "aqui": 4376, "ali": 4142, "lá": 13232, "dentro": 7041, "fora": 9508,
  "em cima": 16688, "embaixo": 8068, "perto": 17347, "longe": 14558,
  "esquerda": 8460, "direita": 7440, "frente": 9638, "atrás": 4506,
  "junto": 12762,

  // === ESCOLA E APRENDIZAGEM ===
  "aula": 4519, "tarefa": 22942, "prova": 18520, "recreio": 19396,
  "quadro": 19098, "mochila": 15761, "biblioteca": 4997,

  // === ATIVIDADES FÍSICAS E LAZER ===
  "natação": 16185, "futebol": 9763, "basquete": 4983,
  "música": 16040, "teatro": 23046, "cinema": 5973, "viagem": 23870,
  "passeio": 17145, "festa": 9093, "aniversário": 4225,

  // === HIGIENE ===
  "sabão": 20089, "xampu": 24045, "toalha": 23215, "escova": 8231,
  "pasta de dente": 17153, "pente": 17284,
};

// Stopwords (conectivos sem pictograma relevante)
const STOPWORDS = new Set([
  'a','o','as','os','e','de','do','da','dos','das','em','no','na','nos','nas',
  'por','para','com','um','uma','uns','umas','ao','aos','à','às','que','mas','ou',
  'se','me','te','lhe','vos','lhes','este','aquele','aquela',
  'seu','sua','teu','tua','quando','como','já','só','então','também',
  'até','sobre','entre','após','sem','pelo','pela','pelos','pelas',
  'num','numa','dum','duma','deste','desta','neste','nesta','desse','dessa',
  'nesse','nessa','daquele','daquela','naquele','naquela','lhe','lhes'
]);

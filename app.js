// app.js — Lógica principal do Gerador de Pictogramas AAC

const CORES = ['#5DCAA5','#85B7EB','#F0997B','#FAC775','#AFA9EC','#ED93B1','#97C459','#F7C1C1'];
const HISTORICO_KEY = 'picto_historico';

// ── Utilitários ──────────────────────────────────────────────────────────────

function $(id) { return document.getElementById(id); }

function setSt(txt) {
  $('st').textContent = txt;
  $('stWrap').style.display = txt ? 'block' : 'none';
}

function imgUrl(id) {
  // Endpoint oficial da API ARASAAC que retorna a imagem diretamente
  return `https://api.arasaac.org/v1/pictograms/${id}?download=false`;
}

// Normaliza texto: minúsculas, sem acentos, sem pontuação
function normaliza(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

// Tenta encontrar ID no dicionário com várias estratégias
function buscaId(palavra) {
  // 1. Exato
  if (DIC[palavra]) return DIC[palavra];
  // 2. Sem acento
  const semAcento = normaliza(palavra);
  for (const [k, v] of Object.entries(DIC)) {
    if (normaliza(k) === semAcento) return v;
  }
  // 3. Começa com a palavra (ex: "banho" → "tomar banho")
  for (const [k, v] of Object.entries(DIC)) {
    if (normaliza(k) === semAcento) return v;
  }
  return null;
}

// ── Gerar pictogramas ─────────────────────────────────────────────────────────

function gerar() {
  const frase = $('inp').value.trim();
  if (!frase) return;

  const sz     = parseInt($('sz').value);
  const showLbl = $('chkL').checked;
  const colorBorder = $('chkC').checked;
  const colorBg = $('chkBg').checked;

  // Tokeniza: preserva palavras compostas do dicionário
  const tokens = tokeniza(frase);

  const inner = $('inner');
  inner.innerHTML = '';
  $('boardWrap').style.display = 'none';

  let encontrados = 0;
  let total = 0;

  tokens.forEach((token, i) => {
    const palavra = token.texto;
    const isStop = token.isStop;
    const id = token.id;

    if (!isStop) total++;
    if (id) encontrados++;

    const bloco = document.createElement('div');
    bloco.className = 'bloco';

    if (id) {
      const wrap = document.createElement('div');
      wrap.className = 'pimg';
      wrap.style.width  = sz + 'px';
      wrap.style.height = sz + 'px';

      if (colorBorder) {
        wrap.style.borderColor = CORES[i % CORES.length];
        wrap.style.borderWidth = '3px';
      }
      if (colorBg) {
        const hex = CORES[i % CORES.length];
        wrap.style.backgroundColor = hex + '22'; // 13% opacidade
        wrap.style.borderColor = hex;
      }

      const img = document.createElement('img');
      img.src = imgUrl(id);
      img.alt = palavra;
      img.style.width  = (sz - 12) + 'px';
      img.style.height = (sz - 12) + 'px';
      img.onerror = function() {
        wrap.style.border = '1.5px dashed #ccc';
        wrap.style.background = '#fafafa';
        wrap.innerHTML = `<span style="font-size:11px;color:#bbb;padding:6px;text-align:center;line-height:1.3;">${palavra}</span>`;
      };
      wrap.appendChild(img);
      bloco.appendChild(wrap);
    } else if (isStop) {
      const v = document.createElement('div');
      v.className = 'pvazio';
      v.style.width  = Math.round(sz * 0.5) + 'px';
      v.style.height = sz + 'px';
      v.textContent = '—';
      bloco.appendChild(v);
      if (showLbl) {
        const tag = document.createElement('div');
        tag.className = 'ctag';
        tag.textContent = 'lig.';
        bloco.appendChild(tag);
      }
    } else {
      const v = document.createElement('div');
      v.className = 'pvazio';
      v.style.width  = sz + 'px';
      v.style.height = sz + 'px';
      v.style.fontSize = '11px';
      v.style.padding = '6px';
      v.style.textAlign = 'center';
      v.style.lineHeight = '1.3';
      v.textContent = '?';
      bloco.appendChild(v);
    }

    if (showLbl) {
      const lbl = document.createElement('div');
      lbl.className = 'lbl';
      lbl.style.maxWidth = (sz + 10) + 'px';
      lbl.style.fontSize = Math.max(11, Math.round(sz * 0.115)) + 'px';
      lbl.textContent = palavra;
      bloco.appendChild(lbl);
    }

    inner.appendChild(bloco);
  });

  // Frase em texto abaixo
  const ft = $('fraseTexto');
  ft.textContent = frase;
  ft.className = 'frase-texto visible';

  $('boardWrap').style.display = 'block';
  setSt(
    total > 0
      ? `${encontrados} de ${total} palavras com pictograma encontrado`
      : ''
  );

  salvarHistorico(frase);
  renderHistorico();
}

// ── Tokenizador com suporte a expressões compostas ────────────────────────────

function tokeniza(frase) {
  // Ordena chaves do dicionário por nº de palavras (maior primeiro) para matches compostos
  const chaves = Object.keys(DIC).sort((a, b) => {
    return b.split(' ').length - a.split(' ').length;
  });

  const texto = frase.trim();
  const resultado = [];
  let i = 0;
  const palavrasBruto = texto.split(/\s+/);

  while (i < palavrasBruto.length) {
    // Tenta matches compostos (2, 3 palavras)
    let matched = false;
    for (let len = 3; len >= 2; len--) {
      if (i + len <= palavrasBruto.length) {
        const candidato = palavrasBruto.slice(i, i + len).join(' ');
        const id = buscaId(candidato);
        if (id) {
          resultado.push({ texto: candidato, id, isStop: false });
          i += len;
          matched = true;
          break;
        }
      }
    }
    if (!matched) {
      const p = palavrasBruto[i].toLowerCase().replace(/[,\.!?;:]/g, '');
      const isStop = STOPWORDS.has(p) || STOPWORDS.has(normaliza(p));
      const id = isStop ? null : buscaId(p);
      resultado.push({ texto: palavrasBruto[i].replace(/[,\.!?;:]/g, ''), id, isStop });
      i++;
    }
  }
  return resultado;
}

// ── Salvar imagem ─────────────────────────────────────────────────────────────

async function salvar() {
  setSt('Gerando imagem, aguarde...');
  try {
    const board = $('board');
    const canvas = await html2canvas(board, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
      allowTaint: true,
      logging: false
    });
    const a = document.createElement('a');
    const frase = $('inp').value.trim().replace(/[^a-zA-Z0-9À-ú ]/g, '').trim().slice(0, 40);
    a.download = `pictogramas_${frase || 'frase'}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
    setSt('Imagem salva com sucesso!');
    setTimeout(() => setSt(''), 3000);
  } catch (e) {
    setSt('Erro ao gerar imagem. Tente novamente.');
  }
}

// ── Histórico ─────────────────────────────────────────────────────────────────

function salvarHistorico(frase) {
  let hist = getHistorico();
  hist = hist.filter(f => f !== frase);
  hist.unshift(frase);
  hist = hist.slice(0, 10);
  localStorage.setItem(HISTORICO_KEY, JSON.stringify(hist));
}

function getHistorico() {
  try { return JSON.parse(localStorage.getItem(HISTORICO_KEY)) || []; }
  catch { return []; }
}

function renderHistorico() {
  const hist = getHistorico();
  const wrap = $('histWrap');
  const lista = $('histLista');
  if (hist.length === 0) { wrap.style.display = 'none'; return; }

  wrap.style.display = 'block';
  lista.innerHTML = '';
  hist.forEach(frase => {
    const item = document.createElement('div');
    item.className = 'hist-item';
    const span = document.createElement('span');
    span.textContent = frase;
    span.onclick = () => {
      $('inp').value = frase;
      gerar();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const del = document.createElement('button');
    del.className = 'hist-del';
    del.textContent = '×';
    del.title = 'Remover';
    del.onclick = (e) => {
      e.stopPropagation();
      let h = getHistorico().filter(f => f !== frase);
      localStorage.setItem(HISTORICO_KEY, JSON.stringify(h));
      renderHistorico();
    };
    item.appendChild(span);
    item.appendChild(del);
    lista.appendChild(item);
  });
}

// ── Limpar ────────────────────────────────────────────────────────────────────

function limpar() {
  $('inp').value = '';
  $('inner').innerHTML = '';
  $('boardWrap').style.display = 'none';
  setSt('');
  $('inp').focus();
}

// ── Init ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  $('inp').addEventListener('keypress', e => { if (e.key === 'Enter') gerar(); });
  renderHistorico();
});

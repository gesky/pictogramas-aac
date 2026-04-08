// app.js — Gerador de Pictogramas AAC
// A API ARASAAC /bestsearch retorna um ARRAY ordenado por relevância.
// Selecionamos o melhor item priorizando aac:true (pictogramas de CAA).

const CORES = ['#5DCAA5','#85B7EB','#F0997B','#FAC775','#AFA9EC','#ED93B1','#97C459','#F7C1C1'];
const HISTORICO_KEY = 'picto_historico';
const CACHE_KEY = 'picto_cache_v2';
const API_BASE = 'https://api.arasaac.org/v1';

function $(id) { return document.getElementById(id); }
function setSt(txt) { $('st').textContent = txt; $('stWrap').style.display = txt ? 'block' : 'none'; }
function imgUrl(id) { return `${API_BASE}/pictograms/${id}?download=false`; }
function normaliza(str) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim();
}

// ── Cache ─────────────────────────────────────────────────────────────────────
function getCache() {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY)) || {}; } catch { return {}; }
}
function setCache(c) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(c)); } catch {}
}

// ── Seleciona melhor pictograma do array retornado pela API ───────────────────
function melhorResultado(arr) {
  if (!Array.isArray(arr) || arr.length === 0) return null;
  // Prioridade 1: marcado como AAC (comunicação aumentativa)
  const aac = arr.find(d => d.aac === true);
  if (aac) return aac._id;
  // Prioridade 2: marcado como aacColor
  const aacC = arr.find(d => d.aacColor === true);
  if (aacC) return aacC._id;
  // Prioridade 3: keyword do tipo 1 (keyword principal, não sinônimo/gíria)
  const tipo1 = arr.find(d => d.keywords?.some(k => k.type === 1));
  if (tipo1) return tipo1._id;
  // Prioridade 4: último item (API ordena por relevância crescente)
  return arr[arr.length - 1]._id;
}

// ── Busca ID via API + cache ──────────────────────────────────────────────────
async function buscaId(palavra) {
  const cache = getCache();
  const key = normaliza(palavra);

  if (key in cache) return cache[key];

  try {
    const res = await fetch(`${API_BASE}/pictograms/pt/bestsearch/${encodeURIComponent(key)}`);
    if (res.ok) {
      const data = await res.json();
      const id = melhorResultado(data);
      cache[key] = id;
      setCache(cache);
      return id;
    }
  } catch (e) { /* sem internet ou CORS — tenta dicionário local */ }

  // Fallback: dicionário local (IDs verificados)
  for (const [k, v] of Object.entries(DIC)) {
    if (normaliza(k) === key) {
      cache[key] = v;
      setCache(cache);
      return v;
    }
  }

  cache[key] = null;
  setCache(cache);
  return null;
}

// ── Tokenizador (suporta expressões compostas do dicionário) ──────────────────
function tokeniza(frase) {
  const palavras = frase.trim().split(/\s+/);
  const resultado = [];
  let i = 0;
  while (i < palavras.length) {
    let matched = false;
    for (let len = 3; len >= 2; len--) {
      if (i + len <= palavras.length) {
        const cand = normaliza(palavras.slice(i, i + len).join(' '));
        if (Object.keys(DIC).some(k => normaliza(k) === cand)) {
          resultado.push(palavras.slice(i, i + len).join(' '));
          i += len; matched = true; break;
        }
      }
    }
    if (!matched) {
      resultado.push(palavras[i].replace(/[,\.!?;:]/g, ''));
      i++;
    }
  }
  return resultado;
}

// ── Criar bloco visual ────────────────────────────────────────────────────────
function criaBloco(texto, id, isStop, idx, sz, showLbl, colorBorder, colorBg) {
  const bloco = document.createElement('div');
  bloco.className = 'bloco';

  if (id) {
    const wrap = document.createElement('div');
    wrap.className = 'pimg';
    wrap.style.width = wrap.style.height = sz + 'px';
    if (colorBorder) { wrap.style.borderColor = CORES[idx % CORES.length]; wrap.style.borderWidth = '3px'; }
    if (colorBg) { const c = CORES[idx % CORES.length]; wrap.style.backgroundColor = c + '22'; wrap.style.borderColor = c; }

    const img = document.createElement('img');
    img.src = imgUrl(id);
    img.alt = texto;
    img.style.width = img.style.height = (sz - 12) + 'px';
    img.onerror = () => {
      wrap.innerHTML = `<span style="font-size:11px;color:#bbb;padding:6px;text-align:center;line-height:1.3">${texto}</span>`;
      wrap.style.border = '1.5px dashed #ccc';
    };
    wrap.appendChild(img);
    bloco.appendChild(wrap);
  } else if (isStop) {
    const v = document.createElement('div');
    v.className = 'pvazio';
    v.style.width = Math.round(sz * 0.5) + 'px';
    v.style.height = sz + 'px';
    v.textContent = '—';
    bloco.appendChild(v);
    if (showLbl) {
      const t = document.createElement('div');
      t.className = 'ctag'; t.textContent = 'lig.';
      bloco.appendChild(t);
    }
  } else {
    const v = document.createElement('div');
    v.className = 'pvazio';
    v.style.cssText = `width:${sz}px;height:${sz}px;font-size:11px;padding:6px;text-align:center;line-height:1.3`;
    v.textContent = '?';
    bloco.appendChild(v);
  }

  if (showLbl) {
    const lbl = document.createElement('div');
    lbl.className = 'lbl';
    lbl.style.maxWidth = (sz + 10) + 'px';
    lbl.style.fontSize = Math.max(11, Math.round(sz * 0.115)) + 'px';
    lbl.textContent = texto;
    bloco.appendChild(lbl);
  }
  return bloco;
}

// ── GERAR ─────────────────────────────────────────────────────────────────────
async function gerar() {
  const frase = $('inp').value.trim();
  if (!frase) return;

  const sz = parseInt($('sz').value);
  const showLbl = $('chkL').checked;
  const colorBorder = $('chkC').checked;
  const colorBg = $('chkBg').checked;

  const tokens = tokeniza(frase);
  const inner = $('inner');
  inner.innerHTML = '';
  $('boardWrap').style.display = 'none';
  $('btnGerar').disabled = true;

  const isStopArr = tokens.map(t => STOPWORDS.has(normaliza(t)));
  const totalConteudo = isStopArr.filter(s => !s).length;
  let resolvidos = 0;

  setSt(`Buscando pictogramas (0/${totalConteudo})...`);

  const ids = await Promise.all(tokens.map(async (t, i) => {
    if (isStopArr[i]) return null;
    const id = await buscaId(t);
    resolvidos++;
    setSt(`Buscando pictogramas (${resolvidos}/${totalConteudo})...`);
    return id;
  }));

  $('btnGerar').disabled = false;

  let encontrados = 0;
  tokens.forEach((t, i) => {
    if (ids[i]) encontrados++;
    inner.appendChild(criaBloco(t, ids[i], isStopArr[i], i, sz, showLbl, colorBorder, colorBg));
  });

  $('fraseTexto').textContent = frase;
  $('fraseTexto').className = 'frase-texto visible';
  $('boardWrap').style.display = 'block';
  setSt(totalConteudo > 0 ? `${encontrados} de ${totalConteudo} palavras com pictograma encontrado` : '');

  salvarHistorico(frase);
  renderHistorico();
}

// ── Salvar imagem ─────────────────────────────────────────────────────────────
async function salvar() {
  setSt('Gerando imagem, aguarde...');
  try {
    const canvas = await html2canvas($('board'), {
      backgroundColor: '#ffffff', scale: 2, useCORS: true, allowTaint: true, logging: false
    });
    const a = document.createElement('a');
    const nome = $('inp').value.trim().replace(/[^a-zA-Z0-9À-ú ]/g,'').trim().slice(0,40);
    a.download = `pictogramas_${nome||'frase'}.png`;
    a.href = canvas.toDataURL('image/png');
    a.click();
    setSt('Imagem salva!');
    setTimeout(() => setSt(''), 3000);
  } catch { setSt('Erro ao salvar imagem.'); }
}

// ── Histórico ─────────────────────────────────────────────────────────────────
function salvarHistorico(frase) {
  let h = getHistorico().filter(f => f !== frase);
  h.unshift(frase);
  try { localStorage.setItem(HISTORICO_KEY, JSON.stringify(h.slice(0, 10))); } catch {}
}
function getHistorico() {
  try { return JSON.parse(localStorage.getItem(HISTORICO_KEY)) || []; } catch { return []; }
}
function renderHistorico() {
  const hist = getHistorico();
  const wrap = $('histWrap'), lista = $('histLista');
  if (!hist.length) { wrap.style.display = 'none'; return; }
  wrap.style.display = 'block';
  lista.innerHTML = '';
  hist.forEach(frase => {
    const item = document.createElement('div');
    item.className = 'hist-item';
    const span = document.createElement('span');
    span.textContent = frase;
    span.onclick = () => { $('inp').value = frase; gerar(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    const del = document.createElement('button');
    del.className = 'hist-del'; del.textContent = '×'; del.title = 'Remover';
    del.onclick = e => {
      e.stopPropagation();
      const h = getHistorico().filter(f => f !== frase);
      try { localStorage.setItem(HISTORICO_KEY, JSON.stringify(h)); } catch {}
      renderHistorico();
    };
    item.appendChild(span); item.appendChild(del); lista.appendChild(item);
  });
}

function limpar() {
  $('inp').value = '';
  $('inner').innerHTML = '';
  $('boardWrap').style.display = 'none';
  setSt('');
  $('inp').focus();
}

document.addEventListener('DOMContentLoaded', () => {
  $('inp').addEventListener('keypress', e => { if (e.key === 'Enter') gerar(); });
  renderHistorico();
});

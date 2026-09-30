/* ══════════════════════════════════════════════════════════════
   전자 기계 이론 마스터 — 그림 모음 (그림10 · 2026-09-30)
   공용 그리기 도우미 links/fig.js 를 쓴다. 이 파일은 index.html · lesson.js 가 함께 부른다.

   한 칸의 모양
     키: { cap:'캡션 한 줄', topics:['Ⅱ-01'…], cards:['4절 링크 기구'…], draw:function(){ … } }
       topics — index.html 의 TOPICS 번호(no). 그 주제 화면에 나온다
       cards  — 그 주제 안의 절 제목(h)과 **똑같이**. 그 절 끝(다음 절 제목 바로 앞)에 그림이 들어간다
     순서 = 같은 절에 그림이 둘이면 이 파일에 적힌 순서대로 나온다.

   그림 내용은 배우기 카드(TOPICS)와 수업 슬라이드(lesson.js) 본문, 1~12차시 학습지를 옮긴 것이다.
   학습지에 없는 수치는 넣지 않았다(수치는 로프 「10 m 이상」 · 자유도 식뿐).
   슬라이드에 있던 그림 13종(구성·자동문·링크·운동·커플링·기어·축배치·나사·캠·벨트·벨트단면·센서구조·실린더)도
   여기로 옮겨 흰 종이 · 폭 480 으로 다시 그렸다. 슬라이드는 같은 키로 이 그림을 부른다.
   ══════════════════════════════════════════════════════════════ */
var FIGS = (function () {
  var F = window.FIG;
  if (!F) return {};
  var C = F.C;
  var t = F.t, box = F.box, line = F.line, arrow = F.arrow, callout = F.callout;

  /* ── 작은 도우미 ─────────────────────────────── */
  function dot(x, y, r, c) { return '<circle cx="' + x + '" cy="' + y + '" r="' + (r || 3) + '" fill="' + (c || C.ink) + '"/>'; }
  function divider(x, y1, y2) { return line(x, y1, x, y2, { c: C.grayM, w: 1.4, dash: '6 5' }); }
  function hdivider(y, x1, x2) { return line(x1, y, x2, y, { c: C.grayM, w: 1.4, dash: '6 5' }); }
  /* 테두리 있는 굵은 막대(링크·축) */
  function bar(x1, y1, x2, y2, c, fill, w) {
    w = w || 12;
    return line(x1, y1, x2, y2, { c: c || C.ink, w: w + 3 }) + line(x1, y1, x2, y2, { c: fill || C.grayL, w: w });
  }
  function arcPts(cx, cy, rx, ry, a0, a1, k) {
    var p = [];
    k = k || 16;
    for (var i = 0; i <= k; i++) { var a = a0 + (a1 - a0) * i / k; p.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); }
    return p;
  }
  /* 둥근 화살표 — 각도는 도(°), 화면 기준 시계 방향이 + */
  function arc(cx, cy, r, d0, d1, o) {
    o = o || {};
    var a0 = d0 * Math.PI / 180, a1 = d1 * Math.PI / 180;
    return F.route(arcPts(cx, cy, r, o.ry || r, a0, a1, 18), { c: o.c || C.ink, w: o.w || 1.8, head: o.head || 9 });
  }
  /* 톱니바퀴 — rp 피치원 반지름, n 잇수, h 이 높이, ph 돌린 각(rad) */
  function gear(cx, cy, rp, n, o) {
    o = o || {};
    var h = o.h || 9, ro = rp + h / 2, ri = rp - h / 2, p = 2 * Math.PI / n, ph = o.ph || 0, pts = [];
    for (var k = 0; k < n; k++) {
      var a = ph + k * p;
      pts.push([cx + ri * Math.cos(a), cy + ri * Math.sin(a)]);
      pts.push([cx + ro * Math.cos(a + 0.15 * p), cy + ro * Math.sin(a + 0.15 * p)]);
      pts.push([cx + ro * Math.cos(a + 0.35 * p), cy + ro * Math.sin(a + 0.35 * p)]);
      pts.push([cx + ri * Math.cos(a + 0.5 * p), cy + ri * Math.sin(a + 0.5 * p)]);
    }
    return F.poly(pts, { close: 1, fill: o.fill || C.grayL, c: o.c || C.ink, w: 1.6 }) +
      F.circle(cx, cy, o.hub || 6, { fill: C.paper, c: o.c || C.ink, w: 1.6 });
  }
  /* 톱니 한 개의 가운데가 각도 a(rad)에 오도록 ph 계산 / 이 사이(골)가 오도록 */
  function toothAt(a, n) { return a - 0.25 * 2 * Math.PI / n; }
  function gapAt(a, n) { return a - 0.75 * 2 * Math.PI / n; }
  function pulley(cx, cy, r, o) {
    o = o || {};
    return F.circle(cx, cy, r, { fill: o.fill || C.grayL, c: o.c || C.ink, w: 1.8 }) +
      F.circle(cx, cy, 6, { fill: C.paper, c: o.c || C.ink, w: 1.4 });
  }
  function person(x, y, c) { /* (x,y) = 발 */
    c = c || C.ink;
    return F.circle(x, y - 46, 8, { fill: C.paper, c: c, w: 2 }) +
      F.poly([[x, y - 38], [x, y - 16]], { c: c, w: 2.4 }) +
      F.poly([[x - 11, y - 30], [x, y - 34], [x + 11, y - 26]], { c: c, w: 2.2 }) +
      F.poly([[x - 9, y], [x, y - 16], [x + 9, y]], { c: c, w: 2.2 });
  }
  function train(x, y, w, name, o) { /* (x,y) = 왼쪽 위 */
    o = o || {};
    var s = box(x, y, w, 28, { fill: o.fill || C.blueL, c: o.c || C.blue, r: 7, w: 1.6 });
    for (var i = 0; i < 3; i++) s += box(x + 10 + i * 22, y + 6, 14, 10, { fill: C.paper, c: o.c || C.blue, r: 2, w: 1 });
    s += t(x + w - 18, y + 14, name, { a: 'm', b: 1, c: o.c || C.blue, size: 15, halo: false });
    s += F.circle(x + 18, y + 31, 5, { fill: C.ink, c: C.ink, w: 1 }) + F.circle(x + w - 18, y + 31, 5, { fill: C.ink, c: C.ink, w: 1 });
    return s;
  }
  function ground(x1, x2, y) { /* 고정면(해칭) */
    var s = line(x1, y, x2, y, { w: 1.8 });
    for (var x = x1 + 4; x < x2; x += 9) s += line(x, y, x - 7, y + 8, { w: 1 });
    return s;
  }
  function pivot(x, y) { /* 땅에 박힌 회전 중심 */
    return F.poly([[x, y], [x - 11, y + 18], [x + 11, y + 18]], { close: 1, fill: C.grayL, w: 1.4 }) + ground(x - 16, x + 16, y + 18);
  }
  function shaft(x1, x2, y, h, fill) { return box(x1, y - h / 2, x2 - x1, h, { fill: fill || C.grayM, r: 2, w: 1.4 }); }
  function centerLine(x1, y1, x2, y2) { return line(x1, y1, x2, y2, { c: C.sub, w: 1, dash: 'center' }); }

  return {

  /* ─────────── Ⅰ-01 전자 기계의 구성 요소 ─────────── */
  '구성': { topics: ['Ⅰ-01'], cards: ['전자 기계란'],
    cap: '전자 기계의 네 덩어리 — 사람의 몸이 하는 일을 그대로 나눠 맡았다',
    draw: function () {
      var x = [10, 130, 250, 370], a = ['센서', '제어 장치', '액추에이터', '기계와 기구'],
        role = ['감지', '판단', '동력 발생', '일 수행'], body = ['눈 · 코 · 입', '뇌', '근육', '뼈 · 인대'], s = '';
      for (var i = 0; i < 4; i++) {
        s += box(x[i], 38, 100, 56, { fill: C.blueL, c: C.blue, label: a[i], size: 15, lc: C.blue });
        s += line(x[i] + 50, 94, x[i] + 50, 164, { c: C.grayM, w: 1.4, dash: '4 4' });
        s += t(x[i] + 50, 126, role[i], { a: 'm', size: 13.5, c: C.sub, b: 1 });
        s += box(x[i], 164, 100, 42, { fill: C.orangeL, c: C.orange, label: body[i], size: 15, lc: C.ink, b: 0 });
        if (i < 3) s += arrow(x[i] + 102, 66, x[i] + 128, 66, { c: C.blue, head: 9 });
      }
      s += t(12, 22, '전자 기계', { b: 1, c: C.blue, size: 15 }) + t(12, 226, '사람', { b: 1, c: C.orange, size: 15 });
      s += t(468, 22, '정보 → 전기 신호 → 동력 → 일', { a: 'e', size: 13, c: C.sub });
      return F.svg(480, 240, s);
    } },

  '자동문': { topics: ['Ⅰ-01'], cards: ['② 제어 장치'],
    cap: '자동문 — 센서가 감지하고, 제어 장치가 판단해 전동기에 명령을 보낸다',
    draw: function () {
      var s = t(70, 22, '입력', { a: 'm', size: 13, c: C.sub, b: 1 }) + t(240, 22, '중계 · 판단', { a: 'm', size: 13, c: C.sub, b: 1 }) +
        t(410, 22, '출력', { a: 'm', size: 13, c: C.sub, b: 1 });
      s += box(12, 36, 116, 58, { fill: C.greenL, c: C.green }) + t(70, 56, '근접 센서', { a: 'm', b: 1, halo: false }) + t(70, 78, '사람을 감지', { a: 'm', size: 13, c: C.sub, halo: false });
      s += box(182, 36, 116, 58, { fill: C.blueL, c: C.blue, w: 2.4 }) + t(240, 56, '제어 장치', { a: 'm', b: 1, c: C.blue, halo: false }) + t(240, 78, '열까? 판단', { a: 'm', size: 13, c: C.sub, halo: false });
      s += box(352, 36, 116, 58, { fill: C.orangeL, c: C.orange }) + t(410, 56, '전동기', { a: 'm', b: 1, halo: false }) + t(410, 78, '동력 발생', { a: 'm', size: 13, c: C.sub, halo: false });
      s += arrow(130, 65, 180, 65, { c: C.green, head: 9 }) + t(155, 50, '신호', { a: 'm', size: 13, c: C.green, b: 1 });
      s += arrow(300, 65, 350, 65, { c: C.blue, head: 9 }) + t(325, 50, '명령', { a: 'm', size: 13, c: C.blue, b: 1 });
      /* 장면: 사람이 다가오고 문이 열린다 */
      s += ground(20, 460, 222);
      s += person(58, 222) + arrow(76, 192, 118, 192, { c: C.sub, w: 1.6, head: 8 });
      s += line(66, 150, 72, 100, { c: C.green, w: 1.4, dash: '4 3' });
      s += t(58, 244, '사람 접근', { a: 'm', size: 13, c: C.sub });
      /* 문틀과 미닫이문 */
      s += box(300, 132, 150, 8, { fill: C.grayM, r: 2, w: 1.2 });
      s += box(290, 140, 44, 82, { fill: C.grayL, r: 2, w: 1.4 }) + box(416, 140, 44, 82, { fill: C.grayL, r: 2, w: 1.4 });
      s += arrow(328, 180, 298, 180, { c: C.orange, w: 2, head: 9 }) + arrow(422, 180, 452, 180, { c: C.orange, w: 2, head: 9 });
      s += arrow(410, 96, 376, 128, { c: C.orange, w: 1.6, head: 8 });
      s += t(375, 244, '문이 열림 (일)', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 258, s);
    } },

  /* ─────────── Ⅰ-02 생산 자동화 시스템 ─────────── */
  'cnc흐름': { topics: ['Ⅰ-02'], cards: ['생산 자동화의 전자 기계 기술'],
    cap: '수치 제어 공작 기계 — 도면의 내용을 코드값으로 입력하면 그 명령대로 절삭한다',
    draw: function () {
      var s = '', x = [15, 175, 335];
      /* 1 도면 */
      s += F.poly([[40, 30], [96, 30], [110, 44], [110, 96], [40, 96]], { close: 1, fill: C.paper, w: 1.6 });
      s += F.path('M54,78 V52 H74 V62 H96 V78 Z', { c: C.blue, w: 1.8 }) + line(54, 88, 96, 88, { c: C.blue, w: 1 });
      /* 2 코드값 */
      s += box(200, 30, 80, 66, { fill: C.grayL, r: 6, w: 1.6 });
      for (var i = 0; i < 4; i++) s += line(212, 44 + i * 13, 212 + [44, 56, 36, 50][i], 44 + i * 13, { c: C.ink, w: 3 });
      /* 3 공작 기계 — 돌아가는 소재와 공구 */
      s += box(362, 50, 76, 30, { fill: C.blueL, c: C.blue, r: 3 }) + box(350, 44, 14, 42, { fill: C.grayM, r: 2, w: 1.4 });
      s += F.poly([[418, 104], [430, 104], [424, 82]], { close: 1, fill: C.orange, c: C.orange, w: 1 }) + line(424, 104, 424, 116, { c: C.orange, w: 4 });
      s += arc(400, 65, 26, 200, 330, { c: C.blue, ry: 12 });
      var a = ['CAD · 설계', 'CAM · 코드값', 'CNC 가공'], b = ['도면을 컴퓨터로', '형상 · 치수 · 순서\n조건 · 공구 입력', '명령대로 절삭'];
      for (var k = 0; k < 3; k++) {
        s += box(x[k], 128, 130, 70, { fill: k === 2 ? C.orangeL : C.blueL, c: k === 2 ? C.orange : C.blue });
        s += F.num(x[k] + 14, 128, k + 1, { c: k === 2 ? C.orange : C.blue });
        s += t(x[k] + 65, 148, a[k], { a: 'm', b: 1, halo: false, ans: k < 2 });
        s += t(x[k] + 65, k === 1 ? 177 : 174, b[k], { a: 'm', size: 13, c: C.sub, halo: false });
      }
      s += arrow(147, 163, 173, 163, { head: 9 }) + arrow(307, 163, 333, 163, { head: 9 });
      s += t(240, 222, '예) CNC 선반 · 머시닝 센터 · CNC 밀링 · CNC 조각기', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 240, s);
    } },

  'cim': { topics: ['Ⅰ-02'], cards: ['자주 나오는 약자'],
    cap: 'CIM(컴퓨터 통합 생산) — 설계 · 생산 · 관리를 컴퓨터 하나로 잇는다',
    draw: function () {
      var s = box(120, 18, 240, 52, { fill: C.blueL, c: C.blue, w: 2.2 });
      s += t(240, 36, 'CIM', { a: 'm', b: 1, size: 18, c: C.blue, halo: false }) + t(240, 57, '컴퓨터 통합 생산', { a: 'm', size: 13.5, halo: false });
      var x = [20, 175, 330], a = ['설계', '생산', '관리'], b = ['CAD', 'FA · FMS', '전체 계획 · 감독'];
      for (var i = 0; i < 3; i++) {
        s += box(x[i], 120, 130, 58, { fill: C.grayL });
        s += t(x[i] + 65, 139, a[i], { a: 'm', b: 1, halo: false }) + t(x[i] + 65, 161, b[i], { a: 'm', size: 13, c: C.sub, halo: false });
        s += arrow(240 + (i - 1) * 50, 72, x[i] + 65, 118, { c: C.blue, both: 1, w: 1.6, head: 8 });
      }
      s += arrow(152, 149, 173, 149, { both: 1, w: 1.4, head: 7, c: C.sub }) + arrow(307, 149, 328, 149, { both: 1, w: 1.4, head: 7, c: C.sub });
      s += t(240, 202, 'FMS — 여러 제품을 한 라인에서 유연하게 생산', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 218, s);
    } },

  /* ─────────── Ⅱ-01 기계와 기구 ─────────── */
  '기계기구': { topics: ['Ⅱ-01'], cards: ['기구'],
    cap: '기계 = 에너지를 받아 기구로 운동을 바꾸고, 그 운동으로 유용한 일을 한다',
    draw: function () {
      var s = box(8, 82, 86, 54, { fill: C.orangeL, c: C.orange }) + t(51, 100, '외부', { a: 'm', b: 1, halo: false }) + t(51, 120, '에너지', { a: 'm', b: 1, halo: false });
      s += box(112, 30, 256, 148, { fill: C.paper, c: C.blue, w: 2.2, r: 12 });
      s += t(126, 50, '기계', { b: 1, c: C.blue, size: 17 }) + t(172, 50, '예) 자동차 · 공작기계', { size: 13, c: C.sub });
      s += box(150, 74, 180, 64, { fill: C.grayL });
      s += t(240, 94, '기구', { a: 'm', b: 1, halo: false }) + t(240, 118, '운동을 전달 · 변환', { a: 'm', size: 13.5, c: C.ink, halo: false });
      s += t(240, 160, '예) 링크 · 캠 · 시계 바늘 기구', { a: 'm', size: 13, c: C.sub });
      s += box(386, 82, 86, 54, { fill: C.greenL, c: C.green }) + t(429, 110, '유용한\n일', { a: 'm', b: 1, halo: false, ans: 1 });
      s += arrow(96, 109, 148, 109, { c: C.orange, head: 9 }) + arrow(332, 109, 384, 109, { c: C.green, head: 9 });
      s += t(240, 204, '기구는 운동만 바꾼다 — 그 자체로는 일을 하지 않는다', { a: 'm', size: 13.5, c: C.red, b: 1 });
      return F.svg(480, 222, s);
    } },

  '조인트': { topics: ['Ⅱ-01'], cards: ['링크와 조인트'],
    cap: '링크(뼈)를 조인트(관절)로 이으면 회전 운동이나 직선 운동이 생긴다',
    draw: function () {
      var s = t(120, 24, '회전 운동', { a: 'm', b: 1 }) + t(360, 24, '직선 운동', { a: 'm', b: 1 }) + divider(240, 14, 214);
      /* 회전: 링크 둘을 핀으로 */
      s += bar(38, 176, 120, 104, C.blue, C.blueL) + bar(120, 104, 208, 150, C.blue, C.blueL);
      s += F.circle(38, 176, 6, { fill: C.paper, c: C.blue }) + F.circle(208, 150, 6, { fill: C.paper, c: C.blue });
      s += F.circle(120, 104, 10, { fill: C.orangeL, c: C.orange, w: 2.2 }) + dot(120, 104, 3, C.orange);
      s += arc(120, 104, 44, 10, 64, { c: C.orange });
      s += callout(70, 148, 36, 116, '링크 (뼈)', { tc: C.blue, b: 1, a: 'm' });
      s += callout(126, 94, 160, 58, '조인트 (관절)', { tc: C.orange, b: 1 });
      s += t(120, 204, '핀 둘레로 돈다', { a: 'm', size: 13, c: C.sub });
      /* 직선: 안내봉 위를 미끄러지는 조인트 */
      s += line(262, 150, 462, 150, { c: C.grayM, w: 6 }) + line(262, 150, 462, 150, { c: C.ink, w: 1 });
      s += box(262, 136, 8, 28, { fill: C.grayM, r: 1, w: 1.2 }) + box(454, 136, 8, 28, { fill: C.grayM, r: 1, w: 1.2 });
      s += box(334, 134, 52, 32, { fill: C.orangeL, c: C.orange, r: 4, w: 2 });
      s += bar(360, 134, 404, 72, C.blue, C.blueL) + F.circle(360, 134, 6, { fill: C.paper, c: C.blue });
      s += arrow(318, 118, 280, 118, { c: C.orange, head: 9 }) + arrow(402, 118, 440, 118, { c: C.orange, head: 9 });
      s += callout(386, 164, 420, 188, '조인트', { tc: C.orange, b: 1 });
      s += callout(392, 90, 424, 66, '링크', { tc: C.blue, b: 1 });
      s += t(340, 204, '안내봉을 따라 미끄러진다', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 222, s);
    } },

  '링크': { topics: ['Ⅱ-01', 'Ⅱ-02'], cards: ['4절 링크 기구', '자유도 계산식'],
    cap: '4절 링크 기구 — 크랭크가 한 바퀴 돌면 레버가 왔다 갔다 한다 (자유도 1)',
    draw: function () {
      var A = [70, 196], B = [51, 144], Cc = [222, 92], D = [260, 196];
      var s = line(A[0], A[1], D[0], D[1], { c: C.sub, w: 4, dash: '10 6' });
      s += F.circle(A[0], A[1], 55, { fill: 'none', c: C.orange, w: 1, dash: '4 4' });
      s += arc(A[0], A[1], 55, 130, 190, { c: C.orange });
      s += bar(B[0], B[1], Cc[0], Cc[1], C.green, C.greenL, 10);
      s += bar(A[0], A[1], B[0], B[1], C.orange, C.orangeL, 10);
      s += bar(Cc[0], Cc[1], D[0], D[1], C.blue, C.blueL, 10);
      s += arc(D[0], D[1], 80, -113, -128, { c: C.blue }) + arc(D[0], D[1], 80, -107, -92, { c: C.blue });
      s += pivot(A[0], A[1]) + pivot(D[0], D[1]);
      [A, B, Cc, D].forEach(function (p) { s += F.circle(p[0], p[1], 6, { fill: C.paper, c: C.ink, w: 2 }); });
      s += callout(60, 168, 22, 120, '크랭크', { tc: C.orange, b: 1, a: 's' });
      s += t(116, 86, '연결대 (커넥팅 로드)', { a: 'm', b: 1, c: C.green, size: 15 });
      s += callout(244, 150, 272, 150, '레버', { tc: C.blue, b: 1 });
      s += t(165, 232, '고정 링크 (프레임)', { a: 'm', size: 14, c: C.sub, b: 1 });
      /* 자유도 계산 */
      s += box(312, 58, 158, 132, { fill: C.yellowL, c: '#ca8a04', w: 1.4 });
      s += t(324, 80, '링크 수 E = 4', { size: 14.5, halo: false }) + t(324, 104, '조인트 수 P₁ = 4', { size: 14.5, halo: false });
      s += line(324, 120, 458, 120, { c: '#ca8a04', w: 1 });
      s += t(324, 142, 'F = 3(E−1) − 2P₁', { size: 14.5, halo: false }) + t(324, 170, '= 9 − 8 = 1', { size: 17, b: 1, c: C.blue, halo: false });
      return F.svg(480, 250, s);
    } },

  /* ─────────── Ⅱ-02 기계 운동의 전달 ─────────── */
  '절대상대': { topics: ['Ⅱ-02'], cards: ['운동의 다섯 가지'],
    cap: '절대 운동은 땅(고정된 곳)에서, 상대 운동은 움직이는 물체에서 바라본 운동이다',
    draw: function () {
      var s = t(120, 24, '절대 운동', { a: 'm', b: 1 }) + t(360, 24, '상대 운동', { a: 'm', b: 1 }) + divider(240, 14, 238);
      s += t(120, 46, '땅에 서서 본다', { a: 'm', size: 13, c: C.sub }) + t(360, 46, '기차 A 에 탄 사람(●)이 본다', { a: 'm', size: 13, c: C.sub });
      /* 왼쪽 */
      s += train(20, 70, 110, 'A') + arrow(138, 84, 222, 84, { c: C.blue, w: 2.4 });
      s += train(20, 128, 110, 'B', { fill: C.greenL, c: C.green }) + arrow(138, 142, 180, 142, { c: C.green, w: 2.4 });
      s += ground(14, 226, 206) + person(206, 204, C.orange);
      s += t(94, 224, '둘 다 앞으로 간다', { a: 'm', size: 13.5, b: 1 });
      /* 오른쪽 */
      s += train(328, 70, 110, 'A') + F.circle(348, 81, 5, { fill: C.orange, c: C.orange, w: 1 });
      s += t(383, 112, '(멈춘 듯 보인다)', { a: 'm', size: 13, c: C.sub });
      s += train(328, 128, 110, 'B', { fill: C.greenL, c: C.green }) + arrow(318, 142, 276, 142, { c: C.green, w: 2.4 });
      s += t(360, 224, 'B 가 뒤로 가는 듯 보인다', { a: 'm', size: 13.5, b: 1 });
      return F.svg(480, 244, s);
    } },

  '운동셋': { topics: ['Ⅱ-02'], cards: ['운동의 다섯 가지'],
    cap: '평면 · 나선 · 구면 운동 — 기계 운동의 대부분은 평면 운동이다',
    draw: function () {
      var s = t(80, 24, '평면 운동', { a: 'm', b: 1 }) + t(240, 24, '나선 운동', { a: 'm', b: 1 }) + t(400, 24, '구면 운동', { a: 'm', b: 1 });
      s += divider(160, 14, 222) + divider(320, 14, 222);
      /* 평면: 한 평면 위에서 옮겨 가며 돈다 */
      s += F.poly([[14, 170], [120, 170], [146, 132], [40, 132]], { close: 1, fill: C.grayL, w: 1.2 });
      s += box(34, 104, 30, 30, { fill: 'none', c: C.sub, r: 2, w: 1.4, dash: '4 3' });
      s += F.g(box(-15, -15, 30, 30, { fill: C.blueL, c: C.blue, r: 2, w: 1.8 }), { x: 112, y: 118, r: 30 });
      s += F.route([[68, 108], [90, 96], [98, 100]], { c: C.blue, w: 1.8, head: 8 });
      s += t(80, 192, '한 평면 안에서', { a: 'm', size: 13.5 }) + t(80, 212, '직선 · 회전', { a: 'm', size: 13, c: C.sub });
      /* 나선: 볼트 */
      s += box(216, 50, 48, 18, { fill: C.grayM, r: 3, w: 1.4 });
      s += box(228, 68, 24, 94, { fill: C.blueL, c: C.blue, r: 2, w: 1.6 });
      for (var y = 74; y < 158; y += 11) s += line(228, y + 6, 252, y, { c: C.blue, w: 1.2 });
      s += arc(240, 59, 34, 200, 340, { c: C.orange, ry: 12 });
      s += arrow(286, 76, 286, 150, { c: C.green, w: 2.2 });
      s += t(240, 192, '돌면서 축 방향으로', { a: 'm', size: 13.5 }) + t(240, 212, '예) 볼트 조이기', { a: 'm', size: 13, c: C.sub });
      /* 구면: 고정점에서 같은 거리 */
      s += F.circle(400, 110, 56, { fill: 'none', c: C.grayM, w: 1.4, dash: '5 4' });
      s += F.path('M344,110 A56,20 0 0 0 456,110', { c: C.grayM, w: 1.2, dash: '5 4' });
      var P = [400 + 56 * Math.cos(-0.9), 110 + 56 * Math.sin(-0.9)];
      s += line(400, 110, P[0], P[1], { c: C.blue, w: 2 }) + dot(P[0], P[1], 5, C.blue);
      s += arc(400, 110, 56, -80, -22, { c: C.blue });
      s += dot(400, 110, 5, C.red) + t(392, 124, '고정점', { a: 'e', size: 13, c: C.red, b: 1 });
      s += t(412, 70, '같은\n거리', { a: 'e', size: 13, c: C.blue });
      s += t(400, 192, '한 점에서 같은 거리', { a: 'm', size: 13.5 }) + t(400, 212, '예) 원추 마찰차', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 228, s);
    } },

  '벡터': { topics: ['Ⅱ-02'], cards: ['스칼라와 벡터'],
    cap: '스칼라는 크기만, 벡터는 크기와 방향을 함께 쓴다',
    draw: function () {
      var s = t(96, 24, '스칼라 —', { a: 'e', b: 1 }) + t(102, 24, '크기만', { b: 1, ans: 1 }) +
        t(296, 24, '벡터 —', { a: 'e', b: 1, c: C.blue }) + t(302, 24, '크기 + 방향', { b: 1, c: C.blue, ans: 1 }) + divider(200, 14, 214);
      s += box(40, 72, 120, 54, { fill: C.grayL, label: '60 km/h', size: 20 });
      s += t(100, 146, '방향은 따지지 않는다', { a: 'm', size: 13.5, c: C.sub });
      s += t(100, 190, '질량 · 길이 · 시간 · 부피', { a: 'm', size: 13.5, b: 1, ans: 1 });
      /* 벡터: 같은 크기, 다른 방향 */
      var O = [262, 150];
      s += dot(O[0], O[1], 4);
      s += arrow(O[0], O[1], O[0], 62, { c: C.blue, w: 3 }) + t(O[0] + 10, 70, '북쪽 60 km/h', { size: 14, c: C.blue, b: 1 });
      s += arrow(O[0], O[1], 372, O[1], { c: C.orange, w: 3 }) + t(380, O[1], '동쪽\n60 km/h', { size: 14, c: C.orange, b: 1 });
      s += t(O[0] + 12, 118, '길이 = 크기', { size: 13, c: C.sub }) ;
      s += t(300, 168, '방향이 다르면 다른 벡터', { a: 'm', size: 13, c: C.sub });
      s += t(340, 196, '힘 · 변위 · 속도 · 가속도', { a: 'm', size: 13.5, b: 1, ans: 1 });
      return F.svg(480, 214, s);
    } },

  '자유도': { topics: ['Ⅱ-02'], cards: ['차원과 자유도'],
    cap: '자유도 — 직선 위 1, 평면 위 3(가로 · 세로 · 회전), 공간 6(이동 3 · 회전 3)',
    draw: function () {
      var s = t(80, 24, '1차원 · 직선', { a: 'm', b: 1 }) + t(240, 24, '2차원 · 평면', { a: 'm', b: 1 }) + t(400, 24, '3차원 · 공간', { a: 'm', b: 1 });
      s += divider(160, 14, 222) + divider(320, 14, 222);
      /* 1D */
      s += line(18, 112, 142, 112, { w: 2 }) + box(66, 100, 28, 24, { fill: C.blueL, c: C.blue, r: 3 });
      s += arrow(62, 84, 26, 84, { c: C.red, head: 9 }) + arrow(98, 84, 134, 84, { c: C.red, head: 9 }) + t(80, 84, 'x', { a: 'm', b: 1, c: C.red });
      /* 2D */
      s += box(180, 60, 120, 104, { fill: C.grayL, r: 4, w: 1.2 });
      s += box(226, 100, 28, 24, { fill: C.blueL, c: C.blue, r: 3 });
      s += arrow(256, 112, 292, 112, { c: C.red, head: 9 }) + t(292, 98, 'x', { a: 'm', b: 1, c: C.red });
      s += arrow(240, 98, 240, 66, { c: C.green, head: 9 }) + t(252, 70, 'y', { b: 1, c: C.green });
      s += arc(240, 112, 30, 110, 200, { c: C.blue }) + t(196, 150, '회전', { a: 'm', size: 13, c: C.blue, b: 1 });
      /* 3D */
      var O = [396, 126];
      s += arrow(O[0], O[1], 454, 146, { c: C.red, head: 9 }) + t(458, 158, 'x', { b: 1, c: C.red });
      s += arrow(O[0], O[1], 348, 150, { c: C.green, head: 9 }) + t(340, 164, 'y', { b: 1, c: C.green });
      s += arrow(O[0], O[1], O[0], 58, { c: C.purple, head: 9 }) + t(O[0] + 10, 58, 'z', { b: 1, c: C.purple });
      s += arc(430, 138, 13, 200, 470, { c: C.blue, w: 1.4, head: 7 }) + arc(366, 140, 13, -60, 210, { c: C.blue, w: 1.4, head: 7 }) +
        arc(O[0], 80, 14, 30, 300, { c: C.blue, w: 1.4, head: 7, ry: 6 });
      s += box(O[0] - 11, O[1] - 11, 22, 22, { fill: C.blueL, c: C.blue, r: 3 });
      s += t(400, 176, '이동 3 + 회전 3', { a: 'm', size: 13, c: C.sub });
      /* 자유도 수 */
      var n = [1, 3, 6];
      for (var i = 0; i < 3; i++) s += box(30 + i * 160, 188, 100, 30, { fill: C.orangeL, c: C.orange, label: '자유도 ' + n[i], lc: C.orange, ans: 1 });
      s += t(80, 150, '앞뒤로만', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 230, s);
    } },

  /* ─────────── Ⅱ-03 전동 기구와 연결 기구 ─────────── */
  '랙피니언': { topics: ['Ⅱ-03'], cards: ['연속 운동 기구'],
    cap: '연속 운동 기구 — 랙과 피니언은 회전을 직선으로, 마찰차는 회전을 회전으로 전한다',
    draw: function () {
      var s = t(120, 24, '회전 → 직선', { a: 'm', b: 1 }) + t(360, 24, '회전 → 회전', { a: 'm', b: 1 }) + divider(240, 14, 222);
      s += t(120, 44, '랙과 피니언', { a: 'm', size: 13.5, c: C.sub }) + t(360, 44, '마찰차 전동', { a: 'm', size: 13.5, c: C.sub });
      /* 피니언 */
      var cx = 120, cy = 104, rp = 42, n = 14, pit = 2 * Math.PI * rp / n;
      s += gear(cx, cy, rp, n, { h: 9, ph: gapAt(Math.PI / 2, n), fill: C.orangeL, c: C.orange });
      /* 랙 — 이 가운데가 cx 에 오도록 */
      var yTip = cy + rp - 4.5, yRoot = cy + rp + 4.5, pts = [[14, yRoot + 16], [14, yRoot]];
      for (var x0 = cx - pit * 5; x0 <= cx + pit * 5 + 0.1; x0 += pit) {
        if (x0 - pit * 0.25 < 14 || x0 + pit * 0.25 > 226) continue;
        pts.push([x0 - pit * 0.25, yRoot], [x0 - pit * 0.1, yTip], [x0 + pit * 0.1, yTip], [x0 + pit * 0.25, yRoot]);
      }
      pts.push([226, yRoot], [226, yRoot + 16]);
      s += F.poly(pts, { close: 1, fill: C.blueL, c: C.blue, w: 1.6 });
      s += arc(cx, cy, 58, 200, 290, { c: C.orange });
      s += arrow(96, 190, 40, 190, { c: C.blue, w: 2.4 });
      s += callout(150, 80, 186, 66, '피니언', { tc: C.orange, b: 1 }) + t(186, 86, '(회전)', { size: 13, c: C.sub });
      s += t(120, 212, '랙 (직선 이동)', { a: 'm', size: 14, c: C.blue, b: 1 });
      /* 마찰차 */
      s += F.circle(318, 118, 46, { fill: C.orangeL, c: C.orange, w: 2 }) + dot(318, 118, 4);
      s += F.circle(398, 118, 34, { fill: C.blueL, c: C.blue, w: 2 }) + dot(398, 118, 4);
      s += arc(318, 118, 58, 200, 290, { c: C.orange }) + arc(398, 118, 46, -20, -110, { c: C.blue });
      s += callout(364, 118, 380, 184, '맞닿은 면의 마찰', { a: 'm', size: 13.5 });
      s += t(318, 212, '원동차', { a: 'm', size: 13.5, c: C.orange, b: 1 }) + t(412, 212, '종동차', { a: 'm', size: 13.5, c: C.blue, b: 1 });
      return F.svg(480, 228, s);
    } },

  '운동': { topics: ['Ⅱ-03'], cards: ['간헐 운동 기구'],
    cap: '연속 운동과 간헐 운동 — 제네바 기구는 원동절이 계속 돌아도 종동절이 멈췄다 돌았다 한다',
    draw: function () {
      var s = t(120, 24, '연속 운동 기구', { a: 'm', b: 1, c: C.green }) + t(360, 24, '간헐 운동 기구', { a: 'm', b: 1, c: C.orange }) + divider(240, 14, 272);
      /* 연속: 맞물린 두 바퀴 */
      s += gear(84, 92, 36, 12, { h: 8, ph: toothAt(0, 12), fill: C.greenL, c: C.green });
      s += gear(156, 92, 36, 12, { h: 8, ph: gapAt(Math.PI, 12), fill: C.grayL });
      s += arc(84, 92, 48, 200, 290, { c: C.green }) + arc(156, 92, 48, -20, -110, { c: C.ink });
      s += t(84, 150, '원동절', { a: 'm', size: 13.5, c: C.green, b: 1 }) + t(156, 150, '종동절', { a: 'm', size: 13.5, b: 1 });
      /* 제네바: G 종동절(홈 4개), D 원동절(핀) */
      var G = [400, 92], R = 44, d = 62, Dp = [G[0] - d, G[1]], sw = 0.12, pts = [];
      for (var k = 0; k < 4; k++) {
        var sa = Math.PI + k * Math.PI / 2, ea = sa + Math.PI / 2;
        var ux = Math.cos(sa), uy = Math.sin(sa), px = -uy, py = ux;
        pts.push([G[0] + R * Math.cos(sa + sw), G[1] + R * Math.sin(sa + sw)]);
        /* 홈과 홈 사이 — 오목한 면 */
        for (var j = 1; j < 12; j++) {
          var u = j / 12, a = sa + sw + (ea - sw - sa - sw) * u, r = R - 9 * Math.sin(Math.PI * u);
          pts.push([G[0] + r * Math.cos(a), G[1] + r * Math.sin(a)]);
        }
        var ux2 = Math.cos(ea), uy2 = Math.sin(ea), px2 = -uy2, py2 = ux2;
        pts.push([G[0] + R * Math.cos(ea - sw), G[1] + R * Math.sin(ea - sw)]);
        pts.push([G[0] + 16 * ux2 - 5 * px2, G[1] + 16 * uy2 - 5 * py2], [G[0] + 16 * ux2 + 5 * px2, G[1] + 16 * uy2 + 5 * py2]);
      }
      /* 첫 홈(왼쪽, sa=π)의 안쪽 점을 맨 앞에 둔다 */
      var first = [[G[0] - 16, G[1] + 5], [G[0] - 16, G[1] - 5]];
      s += F.poly(first.concat(pts.slice(0, -2)), { close: 1, fill: C.orangeL, c: C.orange, w: 1.8 });
      s += dot(G[0], G[1], 4);
      var pin = [G[0] - 22, G[1]];
      s += F.circle(Dp[0], Dp[1], 44, { fill: 'none', c: C.sub, w: 1, dash: '4 4' });
      s += line(Dp[0], Dp[1], pin[0], pin[1] + 0.01, { c: C.ink, w: 5 }) + F.circle(Dp[0], Dp[1], 7, { fill: C.grayL, c: C.ink, w: 1.6 });
      s += F.circle(pin[0], pin[1], 5, { fill: C.red, c: C.red, w: 1 });
      s += arc(Dp[0], Dp[1], 44, 110, 200, { c: C.ink });
      s += t(Dp[0] - 12, 150, '원동절 (핀)', { a: 'm', size: 13.5, b: 1 }) + t(G[0] + 14, 150, '종동절', { a: 'm', size: 13.5, c: C.orange, b: 1 });
      /* 아래: 시간에 따른 돈 양 */
      function axes(x0) {
        return arrow(x0, 250, x0 + 170, 250, { w: 1.2, head: 7, c: C.sub }) + arrow(x0, 250, x0, 172, { w: 1.2, head: 7, c: C.sub }) +
          t(x0 + 170, 264, '시간', { a: 'e', size: 13, c: C.sub }) + t(x0 + 6, 176, '종동절이 돈 양', { size: 13, c: C.sub });
      }
      s += axes(34) + line(34, 250, 190, 190, { c: C.green, w: 2.4 });
      s += axes(274);
      s += F.poly([[274, 250], [300, 250], [322, 230], [348, 230], [370, 210], [396, 210], [418, 190], [440, 190]], { c: C.orange, w: 2.4 });
      s += t(311, 262, '멈춤', { a: 'm', size: 13, c: C.orange }) + t(360, 196, '운동', { a: 'm', size: 13, c: C.orange });
      return F.svg(480, 276, s);
    } },

  '커플링': { topics: ['Ⅱ-03'], cards: ['커플링 — 늘 붙어 있는 연결'],
    cap: '커플링 네 가지 — 두 축이 어떻게 놓였는가로 나뉜다',
    draw: function () {
      function panel(x, y, ttl, sub) {
        return box(x, y, 226, 116, { fill: C.paper, c: C.edge, w: 1.4, r: 10 }) + t(x + 113, y + 20, ttl, { a: 'm', b: 1, c: C.blue }) +
          t(x + 113, y + 100, sub, { a: 'm', size: 13.5, c: C.sub });
      }
      var s = panel(10, 10, '고정 커플링', '두 축이 일직선') + panel(244, 10, '플렉시블 커플링', '진동 · 충격을 완화') +
        panel(10, 136, '올덤 커플링', '평행하게 조금 어긋난 두 축') + panel(244, 136, '유니버설 커플링', '한 점에서 교차하는 두 축');
      /* 고정 */
      s += centerLine(24, 60, 222, 60) + shaft(28, 108, 60, 14) + shaft(124, 204, 60, 14);
      s += box(104, 40, 10, 40, { fill: C.orangeL, c: C.orange, r: 2 }) + box(114, 40, 10, 40, { fill: C.orangeL, c: C.orange, r: 2 });
      /* 플렉시블 */
      s += shaft(262, 338, 58, 14) + shaft(372, 448, 62, 14);
      s += box(336, 42, 8, 34, { fill: C.orangeL, c: C.orange, r: 2 }) + box(366, 46, 8, 34, { fill: C.orangeL, c: C.orange, r: 2 });
      s += F.path('M344,50 q6,8 0,14 q-6,8 0,14 M366,54 q-6,8 0,14 q6,8 0,14', { c: C.green, w: 2.4 });
      s += line(344, 50, 366, 54, { c: C.green, w: 2 }) + line(344, 78, 366, 80, { c: C.green, w: 2 });
      /* 올덤 */
      s += centerLine(24, 180, 222, 180) + centerLine(24, 198, 222, 198);
      s += shaft(28, 96, 180, 14) + shaft(150, 218, 198, 14);
      s += box(96, 164, 10, 34, { fill: C.orangeL, c: C.orange, r: 2 }) + box(140, 182, 10, 34, { fill: C.orangeL, c: C.orange, r: 2 });
      s += box(108, 170, 30, 40, { fill: C.greenL, c: C.green, r: 4 });
      /* 유니버설 */
      s += F.g(shaft(-80, -6, 0, 14), { x: 360, y: 186, r: 16 }) + F.g(shaft(6, 80, 0, 14), { x: 360, y: 186, r: -16 });
      s += centerLine(262, 158, 360, 186) + centerLine(360, 186, 458, 158);
      s += F.circle(360, 186, 10, { fill: C.orangeL, c: C.orange, w: 2 }) + line(352, 186, 368, 186, { c: C.orange, w: 2 }) + line(360, 178, 360, 194, { c: C.orange, w: 2 });
      return F.svg(480, 262, s);
    } },

  '클러치': { topics: ['Ⅱ-03'], cards: ['클러치 — 필요할 때만 붙이는 연결'],
    cap: '맞물림 클러치 — 붙이면 동력이 넘어가고, 떼면 끊긴다 (필요할 때만 연결)',
    draw: function () {
      function jaw(x, y, dir, fill, c) { /* dir 1 = 오른쪽으로 이가 난 쪽 */
        var s = box(dir > 0 ? x - 30 : x, y - 26, 30, 52, { fill: fill, c: c, r: 3 });
        var rows = dir > 0 ? [0, 2, 4] : [1, 3];
        rows.forEach(function (r) { s += box(dir > 0 ? x : x - 14, y - 26 + r * 10.4, 14, 10.4, { fill: fill, c: c, r: 1, w: 1.2 }); });
        return s;
      }
      function row(y, on) {
        var s = t(20, y - 42, on ? '붙임 — 동력 전달' : '뗌 — 동력 끊김', { b: 1, c: on ? C.green : C.red });
        var gap = on ? 0 : 40;
        s += shaft(40, 170, y, 14) + jaw(184, y, 1, C.blueL, C.blue);
        s += shaft(210 + gap, 360, y, 14) + jaw(198 + gap, y, -1, C.orangeL, C.orange);
        s += arc(90, y, 22, 200, 330, { c: C.blue, ry: 20 });
        if (on) s += arc(300, y, 22, 200, 330, { c: C.orange, ry: 20 });
        else s += arrow(250, y - 40, 286, y - 40, { c: C.red, head: 8, w: 1.8 }) + t(350, y - 30, '멈춤', { a: 'm', size: 14, c: C.red, b: 1 });
        return s;
      }
      var s = row(78, true) + hdivider(128, 14, 466) + row(192, false);
      s += t(420, 78, '같이 돈다', { a: 'm', size: 14, c: C.green, b: 1 });
      s += t(106, 236, '원동축', { a: 'm', size: 13.5, c: C.blue, b: 1 }) + t(320, 236, '종동축', { a: 'm', size: 13.5, c: C.orange, b: 1 });
      return F.svg(480, 250, s);
    } },

  /* ─────────── Ⅱ-04 기어 ─────────── */
  '기어': { topics: ['Ⅱ-04'], cards: ['기어란'],
    cap: '맞물린 두 기어 — 큰 쪽이 기어, 작은 쪽이 피니언. 이가 맞물려 미끄럼이 없다',
    draw: function () {
      var s = gear(140, 116, 72, 24, { h: 10, ph: toothAt(0, 24), fill: C.blueL, c: C.blue, hub: 9 });
      s += gear(248, 116, 36, 12, { h: 10, ph: gapAt(Math.PI, 12), fill: C.orangeL, c: C.orange, hub: 7 });
      s += arc(140, 116, 90, 200, 250, { c: C.blue }) + arc(248, 116, 52, -30, -100, { c: C.orange });
      s += t(140, 214, '기어 — 큰 쪽', { a: 'm', b: 1, c: C.blue }) + t(262, 176, '피니언', { a: 'm', b: 1, c: C.orange }) +
        t(262, 196, '작은 쪽', { a: 'm', size: 13.5, c: C.orange });
      s += box(318, 60, 150, 104, { fill: C.greenL, c: C.green, w: 1.4 });
      s += t(393, 82, '이가 맞물린다', { a: 'm', size: 14.5, halo: false }) + t(393, 106, '→ 미끄럼 없음', { a: 'm', size: 14.5, halo: false }) +
        t(393, 136, '정확한 속도비', { a: 'm', b: 1, c: C.green, halo: false });
      s += t(393, 190, '두 기어는 서로', { a: 'm', size: 13, c: C.sub }) + t(393, 208, '반대로 돈다', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 232, s);
    } },

  '축배치': { topics: ['Ⅱ-04'], cards: ['축의 배치로 나눈 기어'],
    cap: '두 축이 평행 · 교차 · 어긋남 — 축의 놓임으로 기어를 나눈다',
    draw: function () {
      var s = t(80, 24, '평행', { a: 'm', b: 1, c: C.blue }) + t(240, 24, '교차', { a: 'm', b: 1, c: C.blue }) + t(400, 24, '어긋남', { a: 'm', b: 1, c: C.blue });
      s += divider(160, 14, 236) + divider(320, 14, 236);
      /* 평행 — 스퍼 기어 한 쌍(옆에서) */
      s += centerLine(18, 70, 142, 70) + centerLine(18, 128, 142, 128);
      s += box(62, 40, 36, 60, { fill: C.blueL, c: C.blue, r: 2 }) + box(62, 102, 36, 52, { fill: C.orangeL, c: C.orange, r: 2 });
      for (var y = 44; y < 100; y += 8) s += line(62, y, 98, y, { c: C.blue, w: 0.8 });
      for (var y2 = 106; y2 < 154; y2 += 8) s += line(62, y2, 98, y2, { c: C.orange, w: 0.8 });
      s += t(80, 172, '스퍼 기어', { a: 'm', b: 1 });
      /* 교차 — 베벨 기어 */
      /* 두 원뿔의 꼭짓점이 두 축의 교점(Q)에서 만난다 */
      var Q = [240, 116];
      s += shaft(172, 202, Q[1], 12) + box(Q[0] - 6, 44, 12, 34, { fill: C.grayM, r: 2, w: 1.4 });
      s += F.poly([[200, 76], [222, 98], [222, 134], [200, 156]], { close: 1, fill: C.blueL, c: C.blue, w: 1.6 });
      s += F.poly([[200, 76], [280, 76], [258, 98], [222, 98]], { close: 1, fill: C.orangeL, c: C.orange, w: 1.6 });
      for (var q = 0; q < 3; q++) {
        s += line(200, 96 + q * 20, 222, 106 + q * 10, { c: C.blue, w: 0.8 });
        s += line(220 + q * 20, 76, 230 + q * 10, 98, { c: C.orange, w: 0.8 });
      }
      s += centerLine(160, Q[1], 300, Q[1]) + centerLine(Q[0], 36, Q[0], 164);
      s += line(222, 98, Q[0], Q[1], { c: C.sub, w: 1, dash: '3 3' });
      s += dot(Q[0], Q[1], 4, C.red);
      s += t(240, 172, '베벨 기어', { a: 'm', b: 1 });
      /* 어긋남 — 웜과 웜 휠 */
      s += gear(400, 118, 34, 16, { h: 8, fill: C.orangeL, c: C.orange });
      s += box(346, 58, 108, 26, { fill: C.blueL, c: C.blue, r: 6 });
      for (var x = 356; x < 450; x += 12) s += line(x, 84, x + 8, 58, { c: C.blue, w: 1.2 });
      s += centerLine(334, 71, 466, 71);
      s += line(392, 118, 408, 118, { c: C.sub, w: 1 }) + line(400, 110, 400, 126, { c: C.sub, w: 1 });
      s += t(400, 172, '웜 기어', { a: 'm', b: 1 });
      s += t(80, 200, '헬리컬 · 헤링본\n내접 · 랙과 피니언', { a: 'm', size: 13, c: C.sub });
      s += t(240, 200, '스파이럴 베벨\n크라운 · 마이터', { a: 'm', size: 13, c: C.sub });
      s += t(400, 200, '하이포이드 · 나사\n페이스', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 240, s);
    } },

  /* ─────────── Ⅱ-05 나사와 캠 ─────────── */
  '나사': { topics: ['Ⅱ-05'], cards: ['나사 각부의 명칭'],
    cap: '수나사 각부의 명칭 — 나사산 · 나사골 · 피치 · 바깥지름 · 골지름',
    draw: function () {
      var x0 = 70, P = 40, yo = 72, yr = 98, yo2 = 188, yr2 = 162, top = 'M' + x0 + ',' + yr, bot = 'M' + x0 + ',' + yr2, i;
      for (i = 0; i < 8; i++) {
        top += ' L' + (x0 + P * i + P / 2) + ',' + yo + ' L' + (x0 + P * (i + 1)) + ',' + yr;
        bot += ' L' + (x0 + P * i + P) + ',' + yo2 + ' L' + (x0 + P * (i + 1) + P / 2) + ',' + yr2;
      }
      /* 몸통 채움: 위아래 사이 */
      var s = box(x0, yr, P * 8.5, yr2 - yr, { fill: C.blueL, c: 'none', r: 0 });
      s += F.path(top, { fill: C.blueL, c: C.blue, w: 2.2 }) + F.path(bot, { fill: C.blueL, c: C.blue, w: 2.2 });
      for (i = 0; i < 8; i++) s += line(x0 + P * i + P / 2, yo, x0 + P * i + P, yo2, { c: C.blue, w: 0.8 });
      s += centerLine(50, 130, 430, 130);
      s += line(x0, yr, x0, yr2, { c: C.blue, w: 2.2 });
      /* 치수 */
      s += F.dim(x0 + P * 1.5, yo, x0 + P * 2.5, yo, '피치', { off: 30, c: C.orange, size: 15 });
      s += F.dim(440, yo, 440, yo2, '바깥지름', { c: C.red, size: 14, side: -1 });
      s += line(x0 + P * 8.5, yo, 446, yo, { c: C.red, w: 1 }) + line(x0 + P * 8, yo2, 446, yo2, { c: C.red, w: 1 });
      s += F.dim(34, yr, 34, yr2, '골지름', { c: C.green, size: 14 });
      s += line(28, yr, x0, yr, { c: C.green, w: 1 }) + line(28, yr2, x0, yr2, { c: C.green, w: 1 });
      s += callout(x0 + P * 4.5, yo, x0 + P * 4.5 + 30, 30, '나사산', { tc: C.blue, b: 1 });
      s += callout(x0 + P * 6, yr, x0 + P * 6 + 10, 214, '나사골', { tc: C.blue, b: 1 });
      return F.svg(480, 228, s);
    } },

  '리드': { topics: ['Ⅱ-05'], cards: ['나사 각부의 명칭'],
    cap: '리드 = 줄 수 × 피치 — 한 바퀴 돌 때 나아가는 거리. 두 줄 나사는 피치의 2배를 나아간다',
    draw: function () {
      var s = t(120, 24, '한 줄 나사', { a: 'm', b: 1 }) + t(360, 24, '두 줄 나사', { a: 'm', b: 1 }) + divider(240, 14, 226);
      function screw(x, two) {
        var o = box(x, 52, 180, 76, { fill: C.grayL, r: 4, w: 1.6 }), P = 24, k = 0;
        for (var xx = x + 8; xx + 16 < x + 180; xx += P, k++) {
          var c = two && (k % 2) ? C.orange : C.blue;
          o += line(xx, 128, xx + 16, 52, { c: c, w: 3 });
        }
        return o;
      }
      s += screw(30, false) + screw(270, true);
      /* 한 줄: P = L */
      s += F.dim(38, 128, 62, 128, 'P', { off: 22, side: -1, c: C.ink, size: 14 });
      s += F.dim(86, 128, 110, 128, 'L', { off: 22, side: -1, c: C.blue, size: 14 });
      s += t(120, 190, '리드 = 피치', { a: 'm', b: 1, c: C.blue });
      /* 두 줄: L = 2P */
      s += F.dim(278, 128, 302, 128, 'P', { off: 22, side: -1, c: C.ink, size: 14 });
      s += F.dim(326, 128, 374, 128, 'L', { off: 22, side: -1, c: C.blue, size: 14 });
      s += t(360, 190, '리드 = 2 × 피치', { a: 'm', b: 1, c: C.blue });
      s += t(240, 216, 'P 피치 — 이웃한 산 사이 · L 리드 — 같은 줄이 한 바퀴 돌아오는 거리', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 230, s);
    } },

  '나사종류': { topics: ['Ⅱ-05'], cards: ['나사의 종류'],
    cap: '나사산의 모양 — 체결용은 삼각, 운동용은 사각 · 사다리꼴 · 톱니 · 둥근 나사',
    draw: function () {
      var P = 26, base = 116, h = 26;
      function prof(x, kind) {
        var pts = [[x, base + 18], [x, base]];
        for (var i = 0; i < 3; i++) {
          var a = x + i * P;
          if (kind === 'tri') pts.push([a + P / 2, base - h], [a + P, base]);
          else if (kind === 'sq') pts.push([a + P * 0.25, base], [a + P * 0.25, base - h], [a + P * 0.75, base - h], [a + P * 0.75, base], [a + P, base]);
          else if (kind === 'trap') pts.push([a + P * 0.18, base], [a + P * 0.36, base - h], [a + P * 0.64, base - h], [a + P * 0.82, base], [a + P, base]);
          else if (kind === 'saw') pts.push([a + P * 0.2, base], [a + P * 0.2, base - h], [a + P * 0.34, base - h], [a + P * 0.9, base], [a + P, base]);
          else if (kind === 'round') for (var k = 1; k <= 10; k++) { var u = k / 10; pts.push([a + P * u, base - h * Math.pow(Math.sin(Math.PI * u), 1.3)]); }
        }
        pts.push([x + 3 * P, base + 18]);
        return F.poly(pts, { close: 1, fill: C.blueL, c: C.blue, w: 1.8 });
      }
      var x = [20, 116, 206, 296, 386], kinds = ['tri', 'sq', 'trap', 'saw', 'round'], nm = ['삼각 나사', '사각 나사', '사다리꼴 나사', '톱니 나사', '둥근 나사'];
      var s = '';
      for (var i = 0; i < 5; i++) {
        s += prof(x[i], kinds[i]);
        s += t(x[i] + 39, 156, nm[i], { a: 'm', size: 13.5, b: 1, ans: 1 });
      }
      /* 묶음 */
      s += F.poly([[16, 70], [16, 62], [102, 62], [102, 70]], { c: C.orange, w: 1.6 }) + t(59, 46, '체결용', { a: 'm', b: 1, c: C.orange });
      s += F.poly([[112, 70], [112, 62], [470, 62], [470, 70]], { c: C.green, w: 1.6 }) + t(291, 46, '운동용', { a: 'm', b: 1, c: C.green });
      s += t(59, 186, '결합 · 조립 · 고정', { a: 'm', size: 13, c: C.sub });
      s += t(291, 186, '회전을 직선 운동으로 바꿔 동력 전달 (볼 나사도 운동용)', { a: 'm', size: 13, c: C.sub, ans: 1 });
      s += t(59, 20, '(미터 · 유니파이)', { a: 'm', size: 13, c: C.sub, ans: 1 });
      return F.svg(480, 202, s);
    } },

  '캠': { topics: ['Ⅱ-05'], cards: ['캠'],
    cap: '캠이 돌면 종동절이 오르내린다 — 평면 캠(판 캠)과 입체 캠(원통 캠)',
    draw: function () {
      var s = t(120, 24, '평면 캠 — 판 캠', { a: 'm', b: 1 }) + t(360, 24, '입체 캠 — 원통 캠', { a: 'm', b: 1 }) + divider(240, 14, 250);
      /* 판 캠 */
      var cx = 112, cy = 172, pts = [], topY = cy;
      for (var i = 0; i < 72; i++) {
        var a = i * 2 * Math.PI / 72, r = 36 + 28 * Math.pow(Math.max(0, Math.cos(a + Math.PI / 2)), 2);
        pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
      }
      pts.forEach(function (p) { if (Math.abs(p[0] - cx) < 4) topY = Math.min(topY, p[1]); });
      s += F.poly(pts, { close: 1, fill: C.blueL, c: C.blue, w: 2 }) + F.circle(cx, cy, 6, { fill: C.paper, c: C.blue });
      s += arc(cx, cy, 76, 140, 230, { c: C.blue });
      s += bar(cx, topY - 6, cx, 52, C.orange, C.orangeL, 10) + F.circle(cx, topY - 6, 7, { fill: C.orangeL, c: C.orange, w: 2 });
      s += box(cx - 22, 80, 10, 22, { fill: C.grayM, r: 1, w: 1.2 }) + box(cx + 12, 80, 10, 22, { fill: C.grayM, r: 1, w: 1.2 });
      s += arrow(150, 88, 150, 52, { c: C.orange, head: 9 }) + arrow(162, 52, 162, 88, { c: C.orange, head: 9 });
      s += t(172, 70, '오르내림', { size: 13.5, c: C.orange, b: 1 });
      s += callout(cx + 4, 60, 60, 52, '종동절', { tc: C.orange, b: 1 });
      s += t(cx, 236, '캠 (원동절)', { a: 'm', size: 13.5, c: C.blue, b: 1 });
      /* 원통 캠 */
      var x1 = 290, x2 = 440, yt = 128, yb = 196;
      s += box(x1, yt, x2 - x1, yb - yt, { fill: C.blueL, c: C.blue, r: 0, w: 2 });
      s += F.path('M' + x1 + ',' + yt + ' A10,34 0 0 0 ' + x1 + ',' + yb, { c: C.blue, w: 2, fill: C.blueL });
      s += F.path('M' + x2 + ',' + yt + ' A10,34 0 0 1 ' + x2 + ',' + yb + ' A10,34 0 0 1 ' + x2 + ',' + yt, { c: C.blue, w: 2, fill: C.grayL });
      s += F.path('M320,' + yb + ' C340,160 380,160 410,' + yt, { c: C.orange, w: 9 }) + F.path('M320,' + yb + ' C340,160 380,160 410,' + yt, { c: C.paper, w: 5 });
      s += centerLine(270, 162, 462, 162);
      s += bar(360, 70, 360, 150, C.orange, C.orangeL, 10);
      s += arrow(336, 90, 296, 90, { c: C.orange, head: 9 }) + arrow(384, 90, 424, 90, { c: C.orange, head: 9 });
      s += t(360, 56, '종동절 — 좌우 왕복', { a: 'm', size: 13.5, c: C.orange, b: 1 });
      s += arc(450, 162, 22, -80, 80, { c: C.blue, ry: 40 });
      s += t(360, 222, '홈을 따라 움직인다', { a: 'm', size: 13.5 }) + t(360, 240, '공간이 작아 소형 기계에', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 256, s);
    } },

  /* ─────────── Ⅱ-06 벨트 · 체인 · 로프 ─────────── */
  '벨트': { topics: ['Ⅱ-06'], cards: ['평벨트 — 바로걸기와 엇걸기'],
    cap: '바로걸기는 두 축이 같은 방향으로, 엇걸기는 반대 방향으로 돈다',
    draw: function () {
      var s = t(120, 24, '바로걸기', { a: 'm', b: 1, c: C.green }) + t(360, 24, '엇걸기', { a: 'm', b: 1, c: C.orange }) + divider(240, 14, 214);
      var r = 34, d = 128;
      /* 바로걸기 */
      var A = [56, 112], B = [56 + d, 112];
      s += line(A[0], A[1] - r, B[0], B[1] - r, { c: C.green, w: 4 }) + line(A[0], A[1] + r, B[0], B[1] + r, { c: C.green, w: 4 });
      s += pulley(A[0], A[1], r) + pulley(B[0], B[1], r);
      s += arc(A[0], A[1], r + 12, 200, 290, { c: C.ink }) + arc(B[0], B[1], r + 12, 200, 290, { c: C.ink });
      s += t(120, 180, '회전 방향이 같다', { a: 'm', b: 1 });
      s += t(120, 202, '고속 · 마모 적음', { a: 'm', size: 13, c: C.sub });
      /* 엇걸기 */
      var A2 = [296, 112], B2 = [296 + d, 112], sb = 2 * r / d, cb = Math.sqrt(1 - sb * sb);
      s += line(A2[0] + r * sb, A2[1] - r * cb, B2[0] - r * sb, B2[1] + r * cb, { c: C.orange, w: 4 });
      s += line(A2[0] + r * sb, A2[1] + r * cb, B2[0] - r * sb, B2[1] - r * cb, { c: C.orange, w: 4 });
      s += F.path('M' + (A2[0] + r * sb) + ',' + (A2[1] - r * cb) + ' A' + r + ',' + r + ' 0 1 0 ' + (A2[0] + r * sb) + ',' + (A2[1] + r * cb), { c: C.orange, w: 4 });
      s += F.path('M' + (B2[0] - r * sb) + ',' + (B2[1] - r * cb) + ' A' + r + ',' + r + ' 0 1 1 ' + (B2[0] - r * sb) + ',' + (B2[1] + r * cb), { c: C.orange, w: 4 });
      s += pulley(A2[0], A2[1], r - 2) + pulley(B2[0], B2[1], r - 2);
      s += arc(A2[0], A2[1], r + 12, 200, 290, { c: C.ink }) + arc(B2[0], B2[1], r + 12, -20, -110, { c: C.ink });
      s += t(360, 180, '회전 방향이 반대', { a: 'm', b: 1 });
      s += t(360, 202, '저속 · 큰 동력 · 마모 많음', { a: 'm', size: 13, c: C.sub });
      /* 바로걸기 풀리 벨트 둘레 */
      s += F.path('M' + A[0] + ',' + (A[1] - r) + ' A' + r + ',' + r + ' 0 0 0 ' + A[0] + ',' + (A[1] + r), { c: C.green, w: 4 });
      s += F.path('M' + B[0] + ',' + (B[1] - r) + ' A' + r + ',' + r + ' 0 0 1 ' + B[0] + ',' + (B[1] + r), { c: C.green, w: 4 });
      return F.svg(480, 220, s);
    } },

  '벨트단면': { topics: ['Ⅱ-06'], cards: ['V 벨트', '타이밍 벨트'],
    cap: '평벨트 · V 벨트 · 타이밍 벨트 — 풀리에 닿는 모양이 서로 다르다',
    draw: function () {
      var s = t(80, 24, '평벨트', { a: 'm', b: 1 }) + t(240, 24, 'V 벨트', { a: 'm', b: 1, c: C.orange }) + t(400, 24, '타이밍 벨트', { a: 'm', b: 1, c: C.green });
      s += divider(160, 14, 212) + divider(320, 14, 212);
      s += t(80, 44, '(단면)', { a: 'm', size: 13, c: C.sub }) + t(240, 44, '(단면)', { a: 'm', size: 13, c: C.sub }) + t(400, 44, '(옆에서)', { a: 'm', size: 13, c: C.sub });
      /* 평벨트 */
      s += box(24, 118, 112, 40, { fill: C.grayM, r: 2 }) + box(36, 96, 88, 22, { fill: C.blueL, c: C.blue, r: 3, w: 2 });
      s += t(80, 176, '풀리', { a: 'm', size: 13, c: C.sub });
      s += t(80, 194, '직사각형 · 마찰', { a: 'm', size: 13.5, b: 1 });
      /* V 벨트 */
      s += F.poly([[180, 84], [206, 84], [222, 130], [258, 130], [274, 84], [300, 84], [300, 158], [180, 158]], { close: 1, fill: C.grayM, w: 1.6 });
      s += F.poly([[204, 90], [276, 90], [260, 128], [220, 128]], { close: 1, fill: C.orangeL, c: C.orange, w: 2 });
      s += line(206, 92, 220, 128, { c: C.red, w: 3 }) + line(274, 92, 260, 128, { c: C.red, w: 3 });
      s += t(240, 176, '양 옆면이 홈에 닿는다', { a: 'm', size: 13, c: C.red });
      s += t(240, 194, '홈에 물려 안 빠진다', { a: 'm', size: 13.5, b: 1 });
      /* 타이밍 벨트 */
      var P = 22;
      s += box(338, 76, 124, 18, { fill: C.greenL, c: C.green, r: 3, w: 2 });
      for (var i = 0; i < 5; i++) s += box(345 + i * P, 94, 12, 14, { fill: C.greenL, c: C.green, r: 2, w: 1.6 });
      var pts = [[338, 158], [338, 108]];
      for (var k = 0; k < 6; k++) { var a = 334 + k * P; pts.push([a, 108], [a + 1, 96], [a + 9, 96], [a + 10, 108]); }
      pts.push([462, 108], [462, 158]);
      s += F.poly(pts.filter(function (p) { return p[0] >= 338 && p[0] <= 462; }), { close: 1, fill: C.grayM, w: 1.4 });
      s += t(400, 176, '벨트의 이 ↔ 풀리의 이', { a: 'm', size: 13, c: C.sub });
      s += t(400, 194, '미끄럼 없이 맞물림', { a: 'm', size: 13.5, b: 1 });
      return F.svg(480, 214, s);
    } },

  '체인': { topics: ['Ⅱ-06'], cards: ['체인 전동'],
    cap: '체인 전동 — 이가 있는 바퀴(스프로킷)에 체인을 감아 먼 축까지 힘을 전한다',
    draw: function () {
      var c1 = [100, 112], r1 = 40, c2 = [340, 112], r2 = 62, d = c2[0] - c1[0], sp = (r2 - r1) / d, cp = Math.sqrt(1 - sp * sp);
      var s = gear(c1[0], c1[1], r1 - 3, 12, { h: 9, fill: C.grayL }) + gear(c2[0], c2[1], r2 - 3, 18, { h: 9, fill: C.grayL });
      /* 체인 경로: 위 직선 → 큰 바퀴 오른쪽 → 아래 직선 → 작은 바퀴 왼쪽 */
      var pts = [], a1 = Math.atan2(-cp, -sp), k;
      var P1 = [c1[0] - r1 * sp, c1[1] - r1 * cp], P2 = [c2[0] - r2 * sp, c2[1] - r2 * cp];
      function seg(A, B, n) { for (var i = 0; i < n; i++) pts.push([A[0] + (B[0] - A[0]) * i / n, A[1] + (B[1] - A[1]) * i / n]); }
      seg(P1, P2, 40);
      var b0 = Math.atan2(P2[1] - c2[1], P2[0] - c2[0]), b1 = -b0;
      for (k = 0; k < 40; k++) { var bb = b0 + (b1 - b0) * k / 40; pts.push([c2[0] + r2 * Math.cos(bb), c2[1] + r2 * Math.sin(bb)]); }
      var Q2 = [c2[0] - r2 * sp, c2[1] + r2 * cp], Q1 = [c1[0] - r1 * sp, c1[1] + r1 * cp];
      seg(Q2, Q1, 40);
      var e0 = Math.atan2(Q1[1] - c1[1], Q1[0] - c1[0]), e1 = Math.atan2(P1[1] - c1[1], P1[0] - c1[0]) + 2 * Math.PI;
      for (k = 0; k < 30; k++) { var ee = e0 + (e1 - e0) * k / 30; pts.push([c1[0] + r1 * Math.cos(ee), c1[1] + r1 * Math.sin(ee)]); }
      s += F.poly(pts, { close: 1, c: C.ink, w: 11 }) + F.poly(pts, { close: 1, c: C.blueL, w: 7 });
      /* 롤러: 둘레를 따라 같은 간격 */
      var L = 0, acc = 0, step = 13;
      for (k = 0; k < pts.length; k++) {
        var p = pts[k], q = pts[(k + 1) % pts.length], dl = Math.hypot(q[0] - p[0], q[1] - p[1]);
        while (acc <= L + dl) { var u = (acc - L) / dl; s += dot(p[0] + (q[0] - p[0]) * u, p[1] + (q[1] - p[1]) * u, 3, C.blue); acc += step; }
        L += dl;
      }
      s += arc(c1[0], c1[1], 20, 200, 320, { c: C.ink, w: 1.6, head: 8 }) + arc(c2[0], c2[1], 30, 200, 320, { c: C.ink, w: 1.6, head: 8 });
      s += callout(c2[0] + 30, c2[1] + 30, 400, 196, '스프로킷', { b: 1, a: 'e' });
      s += callout(220, 71, 250, 36, '롤러 체인', { tc: C.blue, b: 1 });
      s += t(220, 212, '두 축이 멀어 기어로 잇기 어려울 때', { a: 'm', size: 13.5, c: C.sub, ans: 1 });
      return F.svg(480, 228, s);
    } },

  '거리': { topics: ['Ⅱ-06'], cards: ['로프 전동'],
    cap: '두 축 사이의 거리 — 가까우면 기어, 멀면 벨트 · 체인, 10 m 이상이면 로프',
    draw: function () {
      var s = '';
      /* 기어 */
      s += t(16, 26, '기어 전동', { b: 1 }) + t(120, 26, '비교적 가까운 거리', { size: 13, c: C.sub });
      s += gear(48, 62, 20, 10, { h: 7, ph: toothAt(0, 10), fill: C.grayL }) + gear(88, 62, 20, 10, { h: 7, ph: gapAt(Math.PI, 10), fill: C.grayL });
      /* 벨트 · 체인 */
      s += t(16, 104, '벨트 · 체인 전동', { b: 1 }) + t(160, 104, '거리가 멀어 기어가 어려울 때', { size: 13, c: C.sub });
      s += line(48, 122, 248, 122, { c: C.blue, w: 3 }) + line(48, 158, 248, 158, { c: C.blue, w: 3 });
      s += F.path('M48,122 A18,18 0 0 0 48,158', { c: C.blue, w: 3 }) + F.path('M248,122 A18,18 0 0 1 248,158', { c: C.blue, w: 3 });
      s += pulley(48, 140, 16) + pulley(248, 140, 16);
      /* 로프 */
      s += t(16, 190, '로프 전동', { b: 1, c: C.orange });
      s += line(48, 208, 440, 208, { c: C.orange, w: 2.4 }) + line(48, 240, 440, 240, { c: C.orange, w: 2.4 });
      s += F.path('M48,208 A16,16 0 0 0 48,240', { c: C.orange, w: 2.4 }) + F.path('M440,208 A16,16 0 0 1 440,240', { c: C.orange, w: 2.4 });
      s += pulley(48, 224, 14) + pulley(440, 224, 14);
      s += F.dim(48, 256, 440, 256, '', { c: C.orange });
      s += t(244, 276, '10 m 이상 먼 거리도 전달', { a: 'm', b: 1, c: C.orange, ans: 1 });
      return F.svg(480, 292, s);
    } },

  /* ─────────── Ⅲ-01 센서의 구조와 역할 ─────────── */
  '트랜스듀서': { topics: ['Ⅲ-01'], cards: ['세 낱말 구분'],
    cap: '트랜스듀서는 에너지를 바꾸는 변환기 — 센서(검출기)보다 넓은 뜻이다',
    draw: function () {
      var s = box(10, 28, 244, 168, { fill: C.paper, c: C.purple, w: 2, r: 14, dash: '7 5' });
      s += t(24, 48, '트랜스듀서 (변환기)', { b: 1, c: C.purple }) + t(24, 70, '한 에너지 → 다른 에너지', { size: 13, c: C.sub });
      s += box(40, 88, 184, 58, { fill: C.greenL, c: C.green, w: 2 });
      s += t(132, 108, '센서 (검출기)', { a: 'm', b: 1, halo: false }) + t(132, 130, '정보 → 전기 신호', { a: 'm', size: 13.5, halo: false });
      s += arrow(132, 170, 132, 150, { c: C.green, w: 1.8, head: 8 });
      s += t(132, 181, '빛 · 온도 · 압력', { a: 'm', size: 13, c: C.sub });
      s += box(306, 88, 164, 58, { fill: C.orangeL, c: C.orange, w: 2 });
      s += t(388, 108, '액추에이터 (구동기)', { a: 'm', b: 1, halo: false, size: 15 }) + t(388, 130, '실제로 움직인다', { a: 'm', size: 13.5, halo: false });
      s += arrow(226, 117, 304, 117, { c: C.blue, head: 9 }) + t(280, 102, '신호', { a: 'm', size: 13, c: C.blue, b: 1 });
      s += t(388, 170, '전기 · 공압 · 유압으로', { a: 'm', size: 13, c: C.sub });
      s += t(240, 222, '요즘은 트랜스듀서와 센서를 거의 같은 뜻으로도 쓴다', { a: 'm', size: 13, c: C.sub });
      return F.svg(480, 238, s);
    } },

  '센서구조': { topics: ['Ⅲ-01'], cards: ['센서의 구조'],
    cap: '센서의 구조 — 물리량을 받아들이고, 신호를 처리하고, 전기 신호로 출력한다',
    draw: function () {
      var s = box(8, 60, 464, 104, { fill: C.paper, c: C.green, w: 2, r: 14 }) + t(460, 76, '센서', { a: 'e', b: 1, c: C.green, size: 15 });
      var x = [18, 172, 326], a = ['받아들이는 부분', '처리하는 부분', '출력하는 부분'], b = ['물리량을 검출', '신호를 처리', '신호를 내보냄'];
      for (var i = 0; i < 3; i++) {
        s += box(x[i], 92, 136, 58, { fill: C.greenL, c: C.green });
        s += F.num(x[i] + 12, 92, i + 1, { c: C.green });
        s += t(x[i] + 68, 112, a[i], { a: 'm', b: 1, size: 14.5, halo: false }) + t(x[i] + 68, 134, b[i], { a: 'm', size: 13, c: C.sub, halo: false });
        if (i < 2) s += arrow(x[i] + 138, 121, x[i] + 152, 121, { c: C.green, head: 7 });
      }
      s += arrow(90, 26, 90, 88, { c: C.orange, w: 2.4 }) + t(104, 30, '현실 세계의 물리량 (빛 · 소리 · 온도 · 압력 …)', { size: 13.5, c: C.orange, b: 1 });
      s += arrow(390, 152, 390, 196, { c: C.blue, w: 2.4 }) + t(376, 204, '전기 신호', { a: 'e', b: 1, c: C.blue });
      return F.svg(480, 222, s);
    } },

  '성능': { topics: ['Ⅲ-01'], cards: ['센서의 성능 특성 다섯'],
    cap: '감도 · 분해능 · 드리프트 — 그래프로 보는 센서의 성능',
    draw: function () {
      function axes(x0, xl, yl) {
        return arrow(x0, 180, x0 + 130, 180, { w: 1.2, head: 7, c: C.sub }) + arrow(x0, 180, x0, 52, { w: 1.2, head: 7, c: C.sub }) +
          t(x0 + 130, 194, xl, { a: 'e', size: 13, c: C.sub }) + t(x0 + 6, 56, yl, { size: 13, c: C.sub, ans: 1 });
      }
      var s = t(80, 24, '감도', { a: 'm', b: 1 }) + t(240, 24, '분해능', { a: 'm', b: 1 }) + t(400, 24, '드리프트', { a: 'm', b: 1, ans: 1 });
      s += divider(160, 14, 232) + divider(320, 14, 232);
      /* 감도 */
      s += axes(18, '입력', '출력') + line(18, 180, 110, 72, { c: C.blue, w: 2.6 }) + line(18, 180, 140, 146, { c: C.sub, w: 2 });
      s += t(112, 86, '감도 큼', { size: 13, c: C.blue, b: 1 }) + t(100, 136, '감도 작음', { a: 'm', size: 13, c: C.sub });
      s += t(80, 216, '입력이 조금 변해도\n출력이 크게 변함', { a: 'm', size: 13 });
      /* 분해능: 계단 */
      var st = [[178, 180]], y = 180;
      for (var i = 0; i < 5; i++) { st.push([178 + 22 * (i + 1), y]); y -= 22; st.push([178 + 22 * (i + 1), y]); }
      s += axes(178, '입력', '출력') + F.poly(st, { c: C.green, w: 2.4 });
      s += F.dim(260, 114, 260, 92, '', { c: C.orange }) + t(266, 94, '최소', { size: 13, c: C.orange, b: 1, ans: 1 });
      s += t(240, 216, '검출할 수 있는\n가장 작은 변화량', { a: 'm', size: 13, ans: 1 });
      /* 드리프트 */
      s += axes(338, '시간', '출력') + line(338, 130, 466, 130, { c: C.sub, w: 1.4, dash: '6 4' });
      s += F.path('M338,130 C360,128 372,124 390,120 S430,104 462,96', { c: C.red, w: 2.4 });
      s += t(412, 146, '처음 값', { a: 'm', size: 13, c: C.sub });
      s += t(400, 216, '조건이 같은데도\n출력이 조금씩 변함', { a: 'm', size: 13 });
      return F.svg(480, 240, s);
    } },

  /* ─────────── Ⅲ-02 센서의 종류와 구분 ─────────── */
  '광센서': { topics: ['Ⅲ-02'], cards: ['물리 센서'],
    cap: '광센서 — 투광부가 낸 빛이 물체에 가로막히거나 반사되는 변화를 수광부가 감지한다',
    draw: function () {
      var s = t(120, 24, '빛이 가로막힘 (차단)', { a: 'm', b: 1 }) + t(360, 24, '빛이 되돌아옴 (반사)', { a: 'm', b: 1 }) + divider(240, 14, 214);
      /* 차단 */
      s += box(14, 88, 46, 48, { fill: C.orangeL, c: C.orange, label: '투광', size: 13.5, lc: C.orange });
      s += box(180, 88, 46, 48, { fill: C.greenL, c: C.green, label: '수광', size: 13.5, lc: C.green });
      s += arrow(62, 112, 104, 112, { c: C.orange, w: 2.4, flow: true, head: 9 });
      s += line(136, 112, 176, 112, { c: C.grayM, w: 2, dash: '4 4' });
      s += box(106, 66, 30, 92, { fill: C.blueL, c: C.blue, r: 3 }) + t(121, 176, '물체', { a: 'm', size: 13.5, c: C.blue, b: 1 });
      s += t(120, 200, '빛이 안 들어오면 → 감지', { a: 'm', size: 13.5 });
      /* 반사 */
      s += box(258, 72, 54, 80, { fill: C.grayL, r: 6 });
      s += box(264, 78, 42, 30, { fill: C.orangeL, c: C.orange, label: '투광', size: 13, lc: C.orange });
      s += box(264, 116, 42, 30, { fill: C.greenL, c: C.green, label: '수광', size: 13, lc: C.green });
      s += box(412, 66, 30, 92, { fill: C.blueL, c: C.blue, r: 3 }) + t(427, 176, '물체', { a: 'm', size: 13.5, c: C.blue, b: 1 });
      s += arrow(308, 93, 410, 108, { c: C.orange, w: 2.4, flow: true, head: 9 });
      s += arrow(410, 116, 308, 131, { c: C.green, w: 2.4, flow: true, head: 9 });
      s += t(360, 200, '반사된 빛이 들어오면 → 감지', { a: 'm', size: 13.5 });
      return F.svg(480, 216, s);
    } },

  /* ─────────── Ⅳ-01 액추에이터 ─────────── */
  '구동원': { topics: ['Ⅳ-01'], cards: ['세 가지'],
    cap: '액추에이터 세 가지 — 압축 공기 · 작동유(기름) · 전기로 움직인다',
    draw: function () {
      function cyl(x, y, c, fill) {
        return box(x, y - 16, 84, 32, { fill: fill, c: c, r: 3, w: 1.8 }) + box(x + 30, y - 14, 10, 28, { fill: C.grayM, r: 1, w: 1.2 }) +
          box(x + 40, y - 4, 70, 8, { fill: C.grayM, r: 1, w: 1.2 });
      }
      var s = '', y = [48, 124, 200], src = ['압축 공기', '작동유 (기름)', '전기'], sub = ['공기 압축기', '유압 펌프', '전원'],
        nm = ['공압 실린더', '유압 실린더', '전동기 (모터)'], c = [C.blue, C.orange, C.purple], f = [C.blueL, C.orangeL, C.purpleL];
      for (var i = 0; i < 3; i++) {
        s += box(10, y[i] - 26, 116, 52, { fill: f[i], c: c[i] });
        s += t(68, y[i] - 8, src[i], { a: 'm', b: 1, halo: false, size: 15 }) + t(68, y[i] + 13, sub[i], { a: 'm', size: 13, c: C.sub, halo: false });
        s += arrow(128, y[i], 170, y[i], { c: c[i], head: 9, flow: i < 2 });
        s += t(318, y[i] + 30, nm[i], { a: 'm', size: 13.5, b: 1, c: c[i] });
      }
      s += cyl(176, y[0], C.blue, C.blueL) + arrow(296, y[0], 330, y[0], { c: C.blue, both: 1, head: 8 });
      s += cyl(176, y[1], C.orange, C.orangeL) + arrow(296, y[1], 330, y[1], { c: C.orange, both: 1, head: 8 });
      s += box(190, y[2] - 20, 70, 40, { fill: C.purpleL, c: C.purple, r: 8, w: 1.8 }) + box(260, y[2] - 4, 36, 8, { fill: C.grayM, r: 1, w: 1.2 });
      s += arc(304, y[2], 16, -60, 200, { c: C.purple, ry: 16 });
      s += t(404, y[0], '직선 운동', { a: 'm', size: 14 }) + t(404, y[1], '직선 운동\n(큰 힘)', { a: 'm', size: 14 }) + t(404, y[2], '회전 운동', { a: 'm', size: 14 });
      return F.svg(480, 244, s);
    } },

  '실린더': { topics: ['Ⅳ-01'], cards: ['구동 에너지원별 분류'],
    cap: '공압 실린더 — 단동은 스프링으로 돌아오고, 복동은 양쪽 모두 공기로 움직인다',
    draw: function () {
      function body(y) {
        return box(60, y - 30, 220, 60, { fill: C.paper, c: C.ink, r: 4, w: 2.2 }) +
          box(150, y - 28, 16, 56, { fill: C.grayM, r: 2, w: 1.4 }) + box(166, y - 6, 200, 12, { fill: C.grayM, r: 2, w: 1.4 });
      }
      var s = t(16, 26, '단동 실린더', { b: 1, c: C.blue }) + t(130, 26, '— 한쪽만 공기, 돌아올 때는 스프링', { size: 13.5, c: C.sub });
      s += body(80);
      s += box(62, 52, 88, 56, { fill: C.blueL, c: 'none', r: 2 });
      s += F.path('M168,80 l8,-14 l10,28 l10,-28 l10,28 l10,-28 l10,28 l10,-28 l10,28 l10,-28 l8,14', { c: C.green, w: 2 });
      s += arrow(20, 80, 60, 80, { c: C.blue, w: 2.6, head: 10 }) + t(20, 108, '공기', { size: 13.5, c: C.blue, b: 1 });
      s += arrow(378, 80, 426, 80, { c: C.ink, head: 9 });
      s += callout(222, 94, 250, 124, '스프링', { tc: C.green, b: 1 });
      s += hdivider(140, 14, 466);
      s += t(16, 166, '복동 실린더', { b: 1, c: C.blue }) + t(130, 166, '— 나갈 때도 돌아올 때도 공기', { size: 13.5, c: C.sub });
      s += body(220);
      s += box(62, 192, 88, 56, { fill: C.blueL, c: 'none', r: 2 });
      s += arrow(20, 220, 60, 220, { c: C.blue, w: 2.6, head: 10 }) + t(20, 248, '공기', { size: 13.5, c: C.blue, b: 1 });
      s += line(264, 250, 264, 272, { c: C.green, w: 2.6 }) + arrow(264, 272, 264, 252, { c: C.green, w: 2.6, head: 10 });
      s += t(274, 268, '반대쪽 공기 → 돌아옴', { size: 13.5, c: C.green, b: 1 });
      s += arrow(378, 220, 426, 220, { c: C.ink, head: 9, both: 1 });
      s += callout(156, 108, 148, 128, '피스톤', { b: 1, size: 14, a: 'e' }) + callout(330, 76, 342, 58, '피스톤 로드', { size: 13.5 });
      return F.svg(480, 286, s);
    } },

  /* ─────────── Ⅳ-02 공압 장치와 유압 장치 ─────────── */
  '압축성': { topics: ['Ⅳ-02'], cards: ['공압 장치'],
    cap: '공기는 누르면 줄어든다(압축성) — 그래서 저장은 쉽지만 정확한 위치 · 속도 제어는 어렵다',
    draw: function () {
      function cyl(x, fill, py, dots) {
        var s = F.path('M' + x + ',48 V200 H' + (x + 110) + ' V48', { w: 2.2 });
        s += box(x + 2, py + 10, 106, 198 - py - 10, { fill: fill, c: 'none', r: 0 });
        if (dots) for (var yy = py + 22; yy < 196; yy += 16) for (var xx = x + 14; xx < x + 104; xx += 18) s += dot(xx + ((yy / 16) % 2) * 8, yy, 2.6, C.blue);
        s += box(x + 2, py, 106, 10, { fill: C.grayM, r: 1, w: 1.4 }) + box(x + 49, py - 36, 12, 36, { fill: C.grayM, r: 1, w: 1.2 });
        s += box(x + 2, 88, 106, 10, { fill: 'none', c: C.sub, r: 1, w: 1, dash: '4 3' });
        s += arrow(x + 55, 20, x + 55, py - 40, { c: C.red, w: 2.6, head: 10 });
        return s;
      }
      var s = cyl(40, C.blueL, 128, true) + cyl(300, C.orangeL, 94, false);
      s += t(30, 22, '누름', { size: 13.5, c: C.red, b: 1 }) + t(290, 22, '누름', { size: 13.5, c: C.red, b: 1 });
      s += F.dim(160, 98, 160, 128, '', { c: C.blue }) + t(168, 106, '많이\n줄어듦', { size: 13.5, c: C.blue, b: 1 }) + t(168, 150, '점선 =\n처음 자리', { size: 13, c: C.sub });
      s += t(418, 88, '거의\n그대로', { size: 13.5, c: C.orange, b: 1 });
      s += t(95, 222, '공기 (공압)', { a: 'm', b: 1, c: C.blue }) + t(355, 222, '기름 (유압)', { a: 'm', b: 1, c: C.orange });
      s += t(95, 244, '저장 쉬움 · 제어 어려움', { a: 'm', size: 13, c: C.sub, ans: 1 });
      s += t(355, 244, '큰 힘 · 정확한 제어', { a: 'm', size: 13, c: C.sub, ans: 1 });
      return F.svg(480, 258, s);
    } },

  '회로': { topics: ['Ⅳ-02'], cards: ['유압 장치'],
    cap: '공압은 쓴 공기를 대기로 내보내고, 유압은 쓴 기름을 탱크로 되돌린다',
    draw: function () {
      function cyl(x, y, c, fill) {
        return box(x, y - 16, 70, 32, { fill: fill, c: c, r: 3, w: 1.8 }) + box(x + 24, y - 14, 8, 28, { fill: C.grayM, r: 1, w: 1 }) +
          box(x + 32, y - 4, 56, 8, { fill: C.grayM, r: 1, w: 1.2 });
      }
      var s = t(16, 24, '공압', { b: 1, c: C.blue }) + t(64, 24, '— 배관이 간단', { size: 13.5, c: C.sub });
      s += box(16, 44, 96, 40, { fill: C.blueL, c: C.blue, label: '공기 압축기', size: 14 });
      s += box(170, 44, 70, 40, { fill: C.grayL, label: '밸브', size: 14 });
      s += cyl(300, 64, C.blue, C.blueL);
      s += arrow(114, 64, 168, 64, { c: C.blue, flow: true, head: 9 }) + arrow(242, 64, 298, 64, { c: C.blue, flow: true, head: 9 });
      s += F.route([[205, 86], [205, 112], [260, 112]], { c: C.sub, w: 1.8, head: 8, flow: true }) + t(266, 112, '쓴 공기는 대기로 (배기 소음)', { size: 13.5, c: C.sub });
      s += hdivider(138, 14, 466);
      s += t(16, 162, '유압', { b: 1, c: C.orange }) + t(64, 162, '— 배관이 복잡', { size: 13.5, c: C.sub });
      s += box(16, 222, 96, 40, { fill: C.orangeL, c: C.orange, label: '탱크', size: 14 });
      s += box(16, 180, 96, 34, { fill: C.orangeL, c: C.orange, label: '유압 펌프', size: 14, ans: 1 });
      s += box(170, 180, 70, 40, { fill: C.grayL, label: '밸브', size: 14 });
      s += cyl(300, 200, C.orange, C.orangeL);
      s += arrow(114, 197, 168, 197, { c: C.orange, flow: true, head: 9 }) + arrow(242, 200, 298, 200, { c: C.orange, flow: true, head: 9 });
      s += F.route([[205, 222], [205, 242], [114, 242]], { c: C.orange, w: 2.2, head: 9, flow: true });
      s += t(214, 258, '쓴 기름은 탱크로 되돌아온다', { size: 13.5, c: C.orange, b: 1 });
      return F.svg(480, 276, s);
    } }

  };
})();

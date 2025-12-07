// ai.js
export function evaluateStudentByName(name, schools){
  if(!name) return 'Nhập tên để AI đánh giá';
  for(const sc of schools){
    for(const cls of (sc.classes||[])){
      const st = (cls.students||[]).find(s => s.name.toLowerCase() === name.toLowerCase());
      if(st){
        const grades = st.grades || {};
        let out = `Báo cáo: ${st.name} — Lớp ${cls.name} @ ${sc.name}\n\n`;
        const avgs = [];
        for(const sub in grades){
          const arr = grades[sub];
          const avg = arr.reduce((a,b)=>a+b,0) / arr.length;
          avgs.push(avg);
          out += `${sub}: [${arr.join(', ')}] → TB: ${avg.toFixed(2)}\n`;
        }
        const final = avgs.length ? (avgs.reduce((a,b)=>a+b,0)/avgs.length) : 0;
        out += `\nĐiểm TB: ${final.toFixed(2)}\n`;
        if(final >= 9) out += 'Nhận xét: Xuất sắc.';
        else if(final >= 8) out += 'Nhận xét: Học tốt.';
        else if(final >= 7) out += 'Nhận xét: Khá.';
        else if(final >= 6) out += 'Nhận xét: Trung bình.';
        else out += 'Nhận xét: Cần cố gắng hơn.';
        return out;
      }
    }
  }
  return `Không tìm thấy học sinh "${name}"`;
}

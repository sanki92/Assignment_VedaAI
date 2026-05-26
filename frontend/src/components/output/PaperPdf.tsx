"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import type { Difficulty, QuestionPaper } from "@/lib/paper";

const chipColors: Record<Difficulty, { bg: string; color: string }> = {
  Easy: { bg: "#e7f6ec", color: "#1f7a44" },
  Moderate: { bg: "#fdf2e0", color: "#a8650e" },
  Challenging: { bg: "#fcebe9", color: "#b4332c" },
};

const styles = StyleSheet.create({
  page: {
    paddingVertical: 44,
    paddingHorizontal: 48,
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#1b1b1b",
    lineHeight: 1.5,
  },
  school: {
    fontFamily: "Helvetica-Bold",
    fontSize: 18,
    textAlign: "center",
  },
  center: { textAlign: "center", fontFamily: "Helvetica-Bold", fontSize: 12, marginTop: 3 },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    fontFamily: "Helvetica-Bold",
  },
  bold: { fontFamily: "Helvetica-Bold" },
  general: { fontFamily: "Helvetica-Bold", marginTop: 14 },
  studentLine: { fontFamily: "Helvetica-Bold", marginTop: 6 },
  sectionTitle: {
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    fontSize: 13,
    marginTop: 22,
  },
  heading: { fontFamily: "Helvetica-Bold", marginTop: 14 },
  instruction: {
    fontFamily: "Helvetica-Oblique",
    fontSize: 10,
    color: "#6b7280",
    marginTop: 2,
  },
  qRow: { flexDirection: "row", marginTop: 9 },
  qNum: { width: 20 },
  qText: { flex: 1 },
  chip: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  end: { fontFamily: "Helvetica-Bold", marginTop: 18 },
  ansTitle: { fontFamily: "Helvetica-Bold", marginTop: 24 },
});

function PaperDocument({ paper }: { paper: QuestionPaper }) {
  let answerNumber = 0;

  return (
    <Document title={`${paper.subject} Assignment`}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.school}>{paper.school}</Text>
        <Text style={styles.center}>Subject: {paper.subject}</Text>
        <Text style={styles.center}>Class: {paper.grade}</Text>

        <View style={styles.metaRow}>
          <Text>Time Allowed: {paper.timeAllowed}</Text>
          <Text>Maximum Marks: {paper.maxMarks}</Text>
        </View>

        <Text style={styles.general}>{paper.generalInstruction}</Text>

        <View style={{ marginTop: 12 }}>
          <Text style={styles.studentLine}>Name: ________________________</Text>
          <Text style={styles.studentLine}>Roll Number: __________________</Text>
          <Text style={styles.studentLine}>
            Class: {paper.grade} Section: ____________
          </Text>
        </View>

        {paper.sections.map((section) => (
          <View key={section.id}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.heading}>{section.heading}</Text>
            <Text style={styles.instruction}>{section.instruction}</Text>
            {section.questions.map((q, i) => (
              <View key={i} style={styles.qRow}>
                <Text style={styles.qNum}>{i + 1}.</Text>
                <Text style={styles.qText}>
                  <Text
                    style={{
                      ...styles.chip,
                      backgroundColor: chipColors[q.difficulty].bg,
                      color: chipColors[q.difficulty].color,
                    }}
                  >
                    {q.difficulty}
                  </Text>
                  {"  "}
                  {q.text} <Text style={styles.bold}>[{q.marks} Marks]</Text>
                </Text>
              </View>
            ))}
          </View>
        ))}

        <Text style={styles.end}>End of Assignment</Text>

        <Text style={styles.ansTitle}>Answer Key:</Text>
        {paper.sections.flatMap((section) =>
          section.questions.map(() => {
            answerNumber += 1;
            const answer = paper.answerKey[answerNumber - 1] ?? "";
            const current = answerNumber;
            return (
              <View key={current} style={styles.qRow}>
                <Text style={styles.qNum}>{current}.</Text>
                <View style={styles.qText}>
                  {answer.split("\n").map((line, idx) => (
                    <Text key={idx}>{line}</Text>
                  ))}
                </View>
              </View>
            );
          })
        )}
      </Page>
    </Document>
  );
}

export async function downloadPaperPdf(paper: QuestionPaper): Promise<void> {
  const blob = await pdf(<PaperDocument paper={paper} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${paper.subject || "assignment"}-assignment.pdf`
    .replace(/\s+/g, "-")
    .toLowerCase();
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

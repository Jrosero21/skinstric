

export default function PageSubhead({ text }: { text: string }) {
  return (
    <div className="testing-subhead-wrap">
      <p className="testing-subhead">{text}</p>
    </div>
  );
}

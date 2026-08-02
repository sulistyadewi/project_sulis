type MathTextProps = {
  text: string;
};

function renderPower(text: string) {
  return text.split(/(\d+\^\d+)/g).map((part, index) => {
    const match = part.match(/^(\d+)\^(\d+)$/);

    if (!match) return <span key={index}>{part}</span>;

    return (
      <span key={index}>
        {match[1]}
        <sup>{match[2]}</sup>
      </span>
    );
  });
}

export default function MathText({ text }: MathTextProps) {
  if (text.includes("sqrt(")) {
    const parts = text.split(/sqrt\((.*?)\)/g);

    return (
      <span>
        {parts.map((part, index) => {
          if (index % 2 === 1) {
            return (
              <span key={index} className="inline-flex items-start">
                <span className="text-lg">√</span>
                <span className="border-t border-current px-1">{part}</span>
              </span>
            );
          }

          return <span key={index}>{renderPower(part)}</span>;
        })}
      </span>
    );
  }

  return <span>{renderPower(text)}</span>;
}

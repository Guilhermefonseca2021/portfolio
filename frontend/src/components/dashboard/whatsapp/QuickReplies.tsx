const replies = [
  "Olá, tudo bem?",
  "Vou verificar para você.",
  "Obrigado pelo contato.",
];

export default function QuickReplies() {
  return (
    <div
      className="
px-4
flex
gap-2
flex-wrap
"
    >
      {replies.map((item) => (
        <button
          key={item}
          className="
text-xs
px-3
py-2
rounded-lg
bg-secondaryText/10
text-secondaryText
hover:bg-primary
hover:text-primaryText
transition
"
        >
          {item}
        </button>
      ))}
    </div>
  );
}

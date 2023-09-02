export default function FormInput(props) {
  return (
    <input
      className="py-2 px-4 rounded-md bg-slate-900"
      type={props.type}
      placeholder={props.placeholder}
    />
  );
}

export default function FormButton(props) {
  return (
    <button className="bg-slate-900 w-full font-medium rounded-md py-2 hover:bg-sky-500 hover:text-slate-900 transition">
      {props.desc}
    </button>
  );
}

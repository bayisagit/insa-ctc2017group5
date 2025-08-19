import Counter from "./counter";

 function ProductLayout({ children }: { children: React.ReactNode }) {

  return (
    <div >
      


        <Counter />
      <div >{children}</div>
    </div>
  );
}

export default ProductLayout;
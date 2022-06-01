
const PureCompNew = ({name}) => {
  if(name==="joker"||name==="lex"){
    throw new Error("Villain")
  }
  return <>hi {name}</>;
};

export default PureCompNew;

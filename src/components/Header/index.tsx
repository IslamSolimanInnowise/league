import { FC, useContext } from "react";
import logo from "../../assets/images/logo.jpg";
import * as Styled from "./header.styles";
import { GlobalContext } from "../../contexts/global-context";

const Header: FC = () => {
  const { inputVal, setInputVal } = useContext(GlobalContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
  };

  return (
    <Styled.Header>
      <Styled.Logo src={logo} alt="logo image of a photo album" />
      <form>
        <Styled.Input
          type="text"
          placeholder="Search for photos"
          onChange={handleChange}
          value={inputVal}
        />
      </form>
    </Styled.Header>
  );
};
export default Header;

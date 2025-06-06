import logo from "../../assets/images/logo.jpg";
import * as Styled from "./header.styles";

interface HeaderProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputVal: string;
}

const Header: React.FC<HeaderProps> = ({ onChange, inputVal }) => {
  return (
    <Styled.Header>
      <Styled.Logo src={logo} alt="logo image of a photo album" />
      <form>
        <Styled.Input
          type="text"
          placeholder="Search for photos"
          onChange={onChange}
          value={inputVal}
        />
      </form>
    </Styled.Header>
  );
};
export default Header;

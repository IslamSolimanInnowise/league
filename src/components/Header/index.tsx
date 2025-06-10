import { FC, useContext } from 'react';
import logo from '@/assets/images/logo.jpg';
import * as Styled from './header.styles';
import { GlobalContext } from '@/contexts/global-context/global-context';

const Header: FC = () => {
  const { searchTerm, setSearchTerm } = useContext(GlobalContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Styled.Header>
      <Styled.Logo src={logo} alt="logo image of a photo album" />
      <form>
        <Styled.Input type="text" placeholder="Search for photos" onChange={handleChange} value={searchTerm} />
      </form>
    </Styled.Header>
  );
};
export default Header;

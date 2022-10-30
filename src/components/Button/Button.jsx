import { Btn } from "components/Button/Button.styled"
import PropTypes from 'prop-types';
export const Button = ({ loadMore }) => {
  
  return (
    <Btn type="button" onClick= {loadMore} >
      Load more
    </Btn>
  );
};

Btn.propTypes = {
    loadMore: PropTypes.func,
}
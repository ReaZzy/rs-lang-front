import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    padding: '2rem 0',
    width: '80%',
    margin: '0 auto'
  },
  teamMemberPhoto: {
    borderRadius: '50%',
    width: '14rem',
    height: '14rem',
  },
  teamMemberPhotoWrapper: {
    display: 'flex',
    justifyContent: "center",
    marginBottom: '2rem'
  },
  teamHeading: {
    display: 'flex',
    justifyContent: "center",
    marginBottom: '2rem'
  },
  teamMembers: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: "space-between"
  },
  teamMember:{
    marginBottom: '2rem',
    
  },
  teamMemberCard: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: "center"
  },
  teamMemberName: {
    textAlign: 'center'
  },
  teamMemberPosition: {
    textAlign: 'center'
  },
  teamMemberContribution: {
    textAlign: 'center'
  }
  // @media (max-width: 1090px) {
  //   .mainPageVideoContainer {
  //     max-width: 100% !important;
  //     flex-grow: 1 !important;
  //     display: flex;
  //     justify-content: center;
  //   }

})) 
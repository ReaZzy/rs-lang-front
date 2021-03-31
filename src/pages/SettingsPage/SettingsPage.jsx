import React from "react";
import { Container, Grid, Switch, Button } from "@material-ui/core";
import { useStyles } from './styles.module';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import {setSettings} from '../../redux/settings/actions.js'
import { connect, useSelector } from "react-redux";

const SettingsPage = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const settings = useSelector((state) => state.settings);
    const [state, setState] = React.useState({
        checkedWordTranslate: settings.checkedWordTranslate,
        checkedSentenceTranslate: settings.checkedSentenceTranslate,
        checkedHard: settings.checkedHard,
        checkedDeleted: settings.checkedDeleted,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const handleClick = () => {
        props.setSettings(state);
        history.goBack()
    }
      
    return(
        <>
            <Container maxWidth='sm' className={classes.container}>
                <Grid>
                    <Typography variant="h2"  className={classes.settingsTitle}>
                        Настройки
                    </Typography>
                    <Grid className={classes.settingsOption}>
                        <Typography variant="body1" >
                            Добавить перевод изучаемого слова.
                        </Typography>
                        <Switch
                            checked={state.checkedWordTranslate}
                            onChange={handleChange}
                            color="primary"
                            name="checkedWordTranslate"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </Grid>
                    <Grid className={classes.settingsOption}>
                        <Typography variant="body1" >
                            Добавить перевод предложений.
                        </Typography>
                        <Switch
                            checked={state.checkedSentenceTranslate}
                            onChange={handleChange}
                            color="primary"
                            name="checkedSentenceTranslate"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </Grid>
                    <Grid className={classes.settingsOption}>
                        <Typography variant="body1" >
                            Добавить кнопку "Сложное слово".
                        </Typography>
                        <Switch
                            checked={state.checkedHard}
                            onChange={handleChange}
                            color="primary"
                            name="checkedHard"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </Grid>
                    <Grid className={classes.settingsOption}>
                        <Typography variant="body1" >
                            Добавить кнопку "Удалить слово".
                        </Typography>
                        <Switch
                            checked={state.checkedDeleted}
                            onChange={handleChange}
                            color="primary"
                            name="checkedDeleted"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </Grid>
                    <Grid className={classes.settingsButtons}>
                        <Button onClick={handleClick} className={classes.settingsBackButton}>
                            Save and go Back
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    setSettings: (checkedWordTranslate, checkedSentenceTranslate, checkedHard, checkedDeleted) => 
    dispatch(setSettings(checkedWordTranslate, checkedSentenceTranslate, checkedHard, checkedDeleted))
  })
  
export default connect(null, mapDispatchToProps)(SettingsPage);

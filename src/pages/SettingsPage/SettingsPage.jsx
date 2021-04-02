import React, { useCallback } from "react";
import { Container, Grid, Switch, Button } from "@material-ui/core";
import { useStyles } from './styles.module';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

const SettingsPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch()
    const settings = useSelector((state) => state.settings);
    const setSettings = useCallback(
        (state) => 
        dispatch({ type: 'settings/SET_SETTINGS', payload: state }),
        [dispatch]
    )

    const handleChange = (event) => {
        setSettings({ ...settings, [event.target.name]: event.target.checked });
    };

    const handleClick = () => {
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
                            checked={settings.checkedWordTranslate}
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
                            checked={settings.checkedSentenceTranslate}
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
                            checked={settings.checkedHard}
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
                            checked={settings.checkedDeleted}
                            onChange={handleChange}
                            color="primary"
                            name="checkedDeleted"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    </Grid>
                    <Grid className={classes.settingsButtons}>
                        <Button onClick={handleClick} className={classes.settingsBackButton}>
                            Go Back
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default SettingsPage;

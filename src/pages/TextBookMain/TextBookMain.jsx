import React from 'react';
import {Link} from "react-router-dom";
import { Container } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles.module'


export const TextBookMain = () => {
    const classes = useStyles();

    const colors = {
        '1': '#95ff68',
        '2': '#fffc5f',
        '3': '#9ee2ff',
        '4': '#ff5f56',
        '5': '#ffaf47',
        '6': '#ff68d9',
    }

    const moduleNumbers = [1, 2, 3, 4, 5, 6]

    return (
        <Container maxWidth="md" className={classes.moduleContainer} >
            <Grid container className={classes.moduleList} justify="space-between"  spacing={4}>
                {
                    moduleNumbers.map((item, key) => (
                        <Grid id={"module"} xs={4} item style={{height: "422px"}} key={`module${key}`}>
                            <Card className={classes.moduleCardWrapper}>
                                <Link to={`/textbook/${item}/1`} className={classes.moduleCardLink}>
                                    <Grid className={classes.CardContainer}>
                                        <Grid item xs={12}  className={classes.moduleCardHeaderWrapper}>
                                            <Card style={{background: colors[item]}} className={classes.moduleCardHeader}/>
                                        </Grid>
                                        <Grid item xs={12} className={classes.moduleCardBottom}>
                                            <Card className={classes.moduleCardBottom}>
                                                <Typography className={classes.moduleText} variant="h2">Module</Typography>
                                                <Typography className={classes.moduleNumber} variant="h1">{item}</Typography>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </Link>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    )
}
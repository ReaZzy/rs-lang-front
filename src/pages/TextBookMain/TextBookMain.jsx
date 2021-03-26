import React from 'react';
import {Link} from "react-router-dom";
import { Container } from "@material-ui/core";
import styles from "./styles.module.css";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';


export const TextBookMain = () => {
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
        <Container maxWidth="md" className={styles.moduleContainer} >
            <Grid container xs={12} className={styles.moduleList} justify="space-between"  spacing={4}>
                {
                    moduleNumbers.map((item, key) => (
                        <Grid xs={4} item className={styles.moduleItem} key={`module${key}`}>
                            <Card className={styles.moduleCardWrapper}>
                                <Link to={`/textbook/${item}/1`} className={styles.CardLink}>
                                    <Grid container xs={12} direction="column"  className={styles.CardContainer}>
                                        <Grid item xs={4}  className={styles.moduleCardHeader}>
                                            <Card style={{background: colors[item]}} className={styles.moduleCardHeader}></Card>
                                        </Grid>
                                        <Grid item xs={8} className={styles.moduleCardBottom}>
                                            <Card className={styles.moduleCardBottom}>
                                                <Typography className={styles.moduleText} variant="h2">Module</Typography>
                                                <Typography className={styles.moduleNumber} variant="h1">{item}</Typography>
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
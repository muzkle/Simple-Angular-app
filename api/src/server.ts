import app from './app';

app.listen(process.env.PORT || 3334, function () {
    console.log(`API IS RUNNING AT PORT: ${process.env.PORT || 3334} AT ENV: ${process.env.NODE_ENV}`);
});

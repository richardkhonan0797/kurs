# Kurs

To run project.

Dev:
```console
foo@bar:~/path/to/project$ npm run dev
```
Test:  
In .env set NODE_ENV=test
```bash
foo@bar:~/path/to/project$ npm run test
```

DB Connection  
Dev: mongodb://localhost:27017/kurs_db  
Test: mongodb://localhost:27017/kurs_db_test

## To renew kurs everyday at midnight

```console
foo@bar:~/path/to/project$ crontab -e
```
Inside crontab
```console
0 0 * * * curl http://localhost:7000/api/indexing
```


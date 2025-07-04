// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
var empresaRouter = require("./src/routes/empresa");
var enderecoRouter = require("./src/routes/endereco");
var dashboardRouter = require("./src/routes/dashboard");
var funcionarioRouter = require('./src/routes/funcionario');
var galpaoRouter = require("./src/routes/galpao");
var tanqueRouter = require("./src/routes/tanque");
var sensorRouter = require("./src/routes/sensor");
var capturaRouter = require("./src/routes/captura");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/empresa", empresaRouter);
app.use("/endereco", enderecoRouter);
app.use("/dashboard", dashboardRouter);
app.use('/funcionario', funcionarioRouter);
app.use("/galpao", galpaoRouter);
app.use("/tanque", tanqueRouter);
app.use("/sensor", sensorRouter);
app.use("/captura", capturaRouter);

app.listen(PORTA_APP, function () {
    console.log("\x1b[36m\x1b[3m%s\x1b[0m",`
_______________________________________________________________________________________________________________

            ###      ###   ###     #       #        ###       #########      #####    ##########  
            # #      # #   # #    # #     # #     # # # #     # ###### #     ## ##   #  ########        
            # #      # #   # #    # # # # # #    # #   # #    # #     # #     # #   #  # 
            # #      # #   # #    # #  #  # #   # #     # #   # ###### #      # #    # ########   
            # #      # #   # #    # #     # #   # ####### #   # #### #        # #     #######  #  
            # #      #  ###  #    # #     # #   # #     # #   # #    # #      # #           #  # 
            # #####   #     #     # #     # #   # #     # #   # #     # #    ## ##   #######  # 
            #######    #####      ###     ###   ###     ###   ###      ###   #####   #########  

_______________________________________________________________________________________________________________`);
    console.log(`\n          
    A API sendo utilizada é a WEB-DATA-VIZ!                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`)
});

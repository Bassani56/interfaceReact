import Cookies from 'js-cookie';

$("#save").on("click", function() {
    var config = $("#output").data("pivotUIOptions");
    if (config && config.rendererOptions) {
        var config_copy = JSON.parse(JSON.stringify(config));

        // Verificar e remover propriedades não serializáveis, se necessário
        delete config_copy["aggregators"];
        delete config_copy["renderers"];

        // Salvar configuração no cookie
        Cookies.set("pivotConfig", JSON.stringify(config_copy));
        console.log("Config saved:", JSON.stringify(config_copy));
    } else {
        console.log("No rendererOptions found.");
    }
  });

  $("#restore").on("click", function() {
    const savedConfig = Cookies.get("pivotConfig");
    console.log("Retrieved cookie:", savedConfig);

    if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        console.log("Parsed config:", parsedConfig);

        // Restaurar configuração do PivotTable
        $("#output").pivotUI(exampleData, parsedConfig, true);
    } else {
        console.log("No savedConfig found in cookies.");
    }
  });


{/* <button id="save">Save Config</button>
        <button id="restore">Restore Config</button> */}
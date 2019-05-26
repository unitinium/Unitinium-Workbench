using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Unitinium_Workbench.Services
{
    public class JsonRpcService : IJsonRpcService
    {
        private readonly HttpClient _client;
        private readonly Config _config;

        public JsonRpcService(HttpClient client, Config config)
        {
            _client = client;
            _config = config;
        }

        public async Task<JsonRpcResponseData<T>> Invoke<T>(string methodName, params object[] parameters)
        {
            HttpResponseMessage response = null;
            var request = new JsonRpcRequestData()
            {
                method = methodName,
                @params = parameters.Length == 0 ? null : parameters
            };

            var content = new StringContent(JsonConvert.SerializeObject(request));
            response = await _client.PostAsync($"{_config.Host}:{_config.Port}", content);

            var requestString = await response.Content.ReadAsStringAsync();
            var invokeResult = JsonConvert.DeserializeObject<JsonRpcResponseData<T>>(requestString);

            return invokeResult;
        }
    }

    public interface IJsonRpcService
    {
        Task<JsonRpcResponseData<T>> Invoke<T>(string methodName, params object[] parameters);
    }
}
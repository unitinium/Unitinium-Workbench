namespace Unitinium_Workbench
{
    public class MethodDefinition
    {
        public string HumanName { get; set; }
        public string Method { get; set; }
        public ParameterDefinition[] Arguments { get; set; }
    }

    public class ParameterDefinition
    {
        public string Name { get; set; }
        public string Type { get; set; }
    }
}
# syntax=docker/dockerfile:1
  FROM mcr.microsoft.com/dotnet/aspnet:5.0
  COPY published/API.dll/ App/
  WORKDIR /App
  ENTRYPOINT ["dotnet", "API.dll"]
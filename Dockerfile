# Use the official .NET SDK image for building the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy only the backend project file and restore to leverage Docker layer caching
COPY backend/backend.csproj backend/
RUN dotnet restore backend/backend.csproj

# Copy the rest of the backend source code
COPY backend/. backend/.

# Publish the backend project
WORKDIR /src/backend
RUN dotnet publish backend.csproj -c Release -o /app/publish

# Use the official ASP.NET runtime image for running the app
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "backend.dll"]
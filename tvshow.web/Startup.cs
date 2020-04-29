using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using tvshow.web.Infrastructure.Data;
using tvshow.web.Core.Interfaces;
using tvshow.web.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace tvshow.web
{
    public class Startup
    {
        
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

            services.AddTransient<IUserRepository, UserRepository>();

            //services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer();

            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("EstaEsUnaClaveSecreta")),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
            


        //var connection = @"LAPTOP-V1LESJ15\SQLEXPRESS";
        var connection = @"Server=localhost;Database=tvshow;Trusted_Connection=True";
            services.AddDbContext<MyDBContext>(options => options.UseSqlServer(connection));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }              

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();
            /*
            app.MapWhen(
                context => (context.Request.Path
                    .StartsWithSegments(new PathString("/api"))
                ),
                a =>
                {
                    a.UseRouting();
                    a.UseAuthentication();                    
                    a.UseEndpoints(endpoints =>
                    {
                        endpoints
                            .MapControllers()
                            .RequireAuthorization();
                    });
                }
            );*/

            /*app.UseEndpoints(endpoints => {
                endpoints.MapControllers();
            });*/

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            /*
            app.MapWhen(context =>
                context.Request.Path.StartsWithSegments(
                   new PathString("/SecureLog")),
                a => {
                    a.UseRouting();
                    a.UseEndpoints(endpoints => {
                        endpoints.MapControllers()
                            .RequireAuthorization("MustBeReader");
                    });
                }
            );*/

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });

           
        }
    }
}

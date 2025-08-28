import java.sql.Connection;
import java.sql.DriverManager;

public class TesteConexao {
    public static void main(String[] args) {
        String url = "jdbc:sqlserver://localhost:1433;databaseName=reuse_db;encrypt=false";
        String user = "reuseUser";
        String password = "1234";

        try {
            // Carregar o driver manualmente
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");

            Connection conn = DriverManager.getConnection(url, user, password);
            System.out.println("Conexão feita com sucesso!");
            conn.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

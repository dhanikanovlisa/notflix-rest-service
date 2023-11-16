const bcrypt = require ('bcrypt');
const workFactor = 8;

class HashPassword {
  public static async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, workFactor);
  }

  public static async compare(password: string, hash: string | any): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}

export default HashPassword;
import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto, RegisterDto } from "./dto/auth.dto";
import { UsersService } from "../users/users.service";
import { MailService } from "../core/mail/mail.service";
import { MailTemplate } from "../core/mail/mail.interface";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private readonly mailService: MailService
  ) {}

  @Post("login")
  async login(@Res() res: any, @Body() body: LoginDto) {
    if (!body.email || !body.password) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "Check request params" });
    }

    const findUser = await this.userService.findUserByEmail(body.email);
    if (!findUser) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Email or password is incorrect" });
    }

    if (await this.authService.compareHash(body.password, findUser.password)) {
      const token = await this.authService.signIn(findUser.id);
      return res.status(HttpStatus.OK).json({ token });
    }

    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: "Email or password is incorrect" });
  }

  @Post("register")
  async registerUser(@Res() res: any, @Body() body: RegisterDto) {
    let findUser;
    try {
      findUser = await this.userService.findUserByEmail(body.email);
    } catch (e) {
      console.log(e);
    }
    if (findUser) {
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "User with this email is already exists" });
    }
    const user = await this.userService.createUser({
      name: body.name || body.email,
      email: body.email,
      password: body.password,
    });

    if (user) {
      const subject = "Welcome on board!";
      this.mailService.send(user.email, subject, MailTemplate.WELCOME, {
        userName: user.name,
      });
      const token = await this.authService.signIn(user.id.toString());
      return res.status(HttpStatus.OK).json({ token });
    }

    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: "Register user failed" });
  }
}

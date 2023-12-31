const BizResultCode = require('./BaseResultCode');

/**
 * @description 统一返回结果
 */
class BaseResult {
   
    /**
     * 返回code
     */
    code;
    /**
     * 返回消息
     */
    msg;
    /**
     * 返回数据
     */
    data;
    /**
     * 返回时间
     */
    time;

    /**
     * 
     * @param code {number} 返回code
     * @param msg {string} 返回消息
     * @param data {any} 返回具体对象
     */
    constructor(code, msg, data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
        this.time = Date.now();
    }

    /**
     * 成功
     * @param data {any} 返回对象
     * @return {BaseResult}
     */
    static success(data) {
        return new BaseResult(BizResultCode.SUCCESS.code, BizResultCode.SUCCESS.desc, data);
    }

    /**
     * 失败
     */
    static fail(errData) {
        return new BaseResult(BizResultCode.FAILED.code, BizResultCode.FAILED.desc, errData);
    }

    /**
     * 参数校验失败
     */
    static validateFailed(param) {
        return new BaseResult(BizResultCode.VALIDATE_FAILED.code, BizResultCode.VALIDATE_FAILED.desc, param);
    }

    /**
     * 拦截到的业务异常
     * @param bizException {BizException} 业务异常
     */
    static bizFail(bizException) {
        return new BaseResult(bizException.code, bizException.msg, null);
    }

}

module.exports = BaseResult